import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("erro de conexão"));
  }

  if (error.response?.status === 401) {
    // DO something
  }

  return Promise.reject(error);
};
