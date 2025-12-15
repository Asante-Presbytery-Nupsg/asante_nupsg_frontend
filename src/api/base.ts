import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/v1";
const BASE_URL = "https://asante-nupsg-backend.onrender.com/api/v1";

export const BASE_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
