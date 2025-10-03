import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://book-seller-web-backend-1.onrender.com/api/v1",
  withCredentials: true,
});
