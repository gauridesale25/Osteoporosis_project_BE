import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://osteoporosis-project-be.onrender.com"
});

export const loginUser = (data) => API.post("/api/auth/login/", data);
export const registerUser = (data) => API.post("/api/auth/register/", data);

export const predictImage = (formData, token) =>
  API.post("/api/predict/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
    }
  });

export const getHistory = (token) =>
  API.get("/api/history/", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
