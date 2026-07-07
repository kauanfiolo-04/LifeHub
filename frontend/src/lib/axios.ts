import { RefreshResponse } from "@/types/auth.type";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

type AxiosRequestConfigWithRetry = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use(config => {
  if (config.skipAuth) {
    return config;
  }

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Não tenta fazer refresh nessas rotas
    if (originalRequest.skipRefresh) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = api
          .post<RefreshResponse>("/auth/refresh", undefined, {
            skipAuth: true,
            skipRefresh: true
          })
          .then(res => {
            const accessToken = res.data.accessToken;

            localStorage.setItem("accessToken", accessToken);

            return accessToken;
          })
          .catch(err => {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";

            throw err;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        const accessToken = await refreshPromise;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
