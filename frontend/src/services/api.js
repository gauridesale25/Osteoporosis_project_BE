import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://osteoporosis-project-be.onrender.com"
});

export const loginUser = (data) => API.post("auth/login/", data);

export const registerUser = (data) => API.post("auth/register/", data);

export const predictImage = (formData, token) =>
  API.post("predict/", formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getHistory = (token) =>
  API.get("history/", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
