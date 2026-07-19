import requests
from math import radians, sin, cos, sqrt, atan2

OVERPASS_SERVERS = [
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
    "https://overpass-api.de/api/interpreter",
]


def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2
        + cos(radians(lat1))
        * cos(radians(lat2))
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return round(R * c, 2)


def find_nearest_hospital(latitude, longitude):

    query = f"""
[out:json][timeout:25];
(
  node["amenity"="hospital"](around:10000,{latitude},{longitude});
  way["amenity"="hospital"](around:10000,{latitude},{longitude});
  relation["amenity"="hospital"](around:10000,{latitude},{longitude});
);
out center tags;
"""

    response = None

    # Try multiple Overpass servers
    for server in OVERPASS_SERVERS:
        try:
            response = requests.post(
                server,
                data=query,
                headers={"User-Agent": "ResQAI/1.0"},
                timeout=20,
            )

            response.raise_for_status()

            data = response.json()

            hospitals = []

            for h in data.get("elements", []):

                tags = h.get("tags", {})

                lat = h.get("lat") or h.get("center", {}).get("lat")
                lon = h.get("lon") or h.get("center", {}).get("lon")

                if lat is None or lon is None:
                    continue

                hospital_name = (
                    tags.get("name")
                    or tags.get("official_name")
                    or tags.get("operator")
                    or tags.get("brand")
                    or "Unnamed Hospital"
                )

                address = ", ".join(
                    filter(
                        None,
                        [
                            tags.get("addr:housenumber"),
                            tags.get("addr:street"),
                            tags.get("addr:suburb"),
                            tags.get("addr:city"),
                            tags.get("addr:district"),
                            tags.get("addr:state"),
                        ],
                    )
                )

                if address == "":
                    address = "Address unavailable"

                phone = (
                    tags.get("phone")
                    or tags.get("contact:phone")
                    or "Not Available"
                )

                website = (
                    tags.get("website")
                    or tags.get("contact:website")
                    or ""
                )

                hospitals.append(
                    {
                        "name": hospital_name,
                        "distance": calculate_distance(
                            latitude,
                            longitude,
                            lat,
                            lon,
                        ),
                        "latitude": lat,
                        "longitude": lon,
                        "address": address,
                        "phone": phone,
                        "website": website,
                        "emergency": tags.get("emergency", "yes"),
                    }
                )

            hospitals.sort(key=lambda x: x["distance"])

            if not hospitals:
                continue

            # Return first hospital with a proper name
            for hospital in hospitals:
                if hospital["name"] != "Unnamed Hospital":
                    return hospital

            return hospitals[0]

        except Exception as e:
            print(f"Server {server} failed:", e)
            continue

    # All servers failed
    return {
        "name": "Hospital Search Unavailable",
        "distance": "-",
        "latitude": None,
        "longitude": None,
        "address": "Not Available",
        "phone": "Not Available",
        "website": "",
        "emergency": "Unknown",
    }