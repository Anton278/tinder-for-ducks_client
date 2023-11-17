import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "http://localhost:5000",
  headers: {
    "Access-Token": `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(err);
    }

    originalRequest._retry = true;
    try {
      const res = await api.post("/auth/refreshAccessToken");
      const accessToken = res.data.accessToken;
      api.defaults.headers["Access-Token"] = `Bearer ${accessToken}`;
      originalRequest.headers["Access-Token"] = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
