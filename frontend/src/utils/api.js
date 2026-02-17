import axios from "axios";

const api = axios.create({
  baseURL: "https://seasoned-api.onrender.com",
});

export { api };
