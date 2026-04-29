import axios from "axios";

const api = axios.create({
  baseURL: "https://fullstack-review2-backend.onrender.com", //  backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;