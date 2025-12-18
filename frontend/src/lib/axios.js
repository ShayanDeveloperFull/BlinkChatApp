import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://blinkchatapp-5x02.onrender.com/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("authUser");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});
