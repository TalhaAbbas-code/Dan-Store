import axios from 'axios'


const API = axios.create({
  baseURL: "http://adeelabbas2.nayatel.net:8000",
});

export const SendOtp = (formData) => API.post("/api/Auth/SendOtp", formData);

export const AuthenticateMobileUser = (formData) =>
  API.post("/api/Auth/AuthenticateMobileUser", formData);
