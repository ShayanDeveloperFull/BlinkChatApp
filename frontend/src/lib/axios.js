import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blinkchatapp-5x02.onrender.com/api",
  withCredentials: true
});
