import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";


type AxiosRequestConfigWithRetry = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

let refreshPromise: Promise<string> | null = null;
let failedQueue: FailedQueueItem[]= [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // se já existe refresh em andamento, espera ele
      if (!refreshPromise) {
        refreshPromise = api
          .post<{ accessToken: string }>("/auth/refresh")
          .then((res) => {
            const newToken = res.data.accessToken;

            localStorage.setItem("accessToken", newToken);

            api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

            return newToken;
          })
          .catch((err) => {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            throw err;
          })
          .finally(() => {
            refreshPromise = null; // reset
          });
      }

      try {
        const newToken = await refreshPromise;

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);