import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<(token?: string) => void> = [];

const waitForRefresh = () =>
  new Promise<void>((resolve) => {
    failedQueue.push(() => resolve());
  });


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

     if (originalRequest.url.includes("/auth/refresh-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        await waitForRefresh();
        return api(originalRequest);
      }

      isRefreshing = true;
      try {
        await api.post("/auth/refresh-token");
        failedQueue.forEach((cb) => cb());
        failedQueue = [];
        return api(originalRequest);
      } catch (refreshError) {
        failedQueue = [];
        console.error("Refresh token failed:", refreshError);
        return Promise.reject({isAuthError: true, originalError: refreshError}); // Propagate the error
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api