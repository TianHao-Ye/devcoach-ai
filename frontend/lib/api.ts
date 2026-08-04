import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//adda token to every protected request
api.interceptors.request.use((config) => {
  //browser: window exists, server: windows does not exist, as local storage is browser API
  if (typeof window === "undefined") {
    return config;
  }

  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
