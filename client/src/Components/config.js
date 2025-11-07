import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  timeout: 60000, // 60 seconds to allow for cold starts
});

// Separate instance for health checks with longer timeout
export const healthCheckInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  timeout: 90000, // 90 seconds for initial wake-up
});
