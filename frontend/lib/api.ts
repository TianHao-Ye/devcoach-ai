// import { removeAccessToken } from "@/features/auth/utils/token";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // Accept Set-Cookie responses and send cookies on requests to the API.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// token invalid or expired, api return authorization fail, remove token and go to login page
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      // removeAccessToken();

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);
