import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_emergency(category, age, gender, description):
    prompt = f"""
You are an emergency medical AI.

Patient Details:
Category: {category}
Age: {age}
Gender: {gender}

Emergency Description:
{description}

Respond ONLY in JSON.

Example:

{{
    "severity":"Critical",
    "confidence":95,
    "emergency_type":"Road Accident",
    "first_aid":[
        "Step 1",
        "Step 2",
        "Step 3"
    ],
    "hospital_type":"Trauma Center"
}}

No markdown.
No explanation.
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    text = text.replace("```json", "").replace("```", "")

    return json.loads(text)