import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const fetchProperties = () => API.get("/properties");
export const postProperty = (data, token) =>
  API.post("/properties", data, {
    headers: {
      Authorization: token,
    },
  });
