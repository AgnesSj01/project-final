import axios from "axios";

// Shared axios instance with the backend base URL
const api = axios.create({
  baseURL: "https://seasoned-api.onrender.com",
});
export { api };
