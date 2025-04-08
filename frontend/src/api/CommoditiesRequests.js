import axios from "axios";

const API = axios.create({
  baseURL: "http://adeelabbas2.nayatel.net:8000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const GetCommodities = (data) => API.post("/Commodity/GetCommodities", data);
