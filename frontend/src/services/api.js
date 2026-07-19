import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const analyzeEmergency = async (data) => {
  const response = await api.post("/analyze", data);
  return response.data;
};

export default api;