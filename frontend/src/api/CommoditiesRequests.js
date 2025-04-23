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

export const GetCommodities = () => API.get("/Commodity/GetCommodities");
export const SetCommodities = (data) => API.post("/Commodity/GetSubCommodities",data);
export const GetUnits = () => API.get("/Trade/GetUnits");
export const CreateTrade = (payload) => API.post("/Trade/CreateTrade",payload);

