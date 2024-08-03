import { getQueryClient } from "@/providers/RootProvider";
import useBoundStore from "@/store";
import axios, { AxiosError, AxiosResponse } from "axios";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || "/api/";

let refreshTokenRequest: null | Promise<void> = null;

const defaultHeaders = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL: apiDomain,
  withCredentials: true,
  headers: defaultHeaders,
});

const refresh = async (): Promise<void> => {
  try {
    await axios.get("/api/auth/refresh");
  } catch (error: unknown) {
    refreshTokenRequest = null;

    if (error instanceof AxiosError && error.response?.status === 401) {
      useBoundStore.getState().unAuthenticate();

      const queryClient = getQueryClient();
      queryClient.removeQueries();
    }

    return Promise.reject(error);
  }
};

const onResponse = (response: AxiosResponse): AxiosResponse => response.data;

const onResponseError = async (
  error: AxiosError
): Promise<AxiosResponse | AxiosError> => {
  if (error.response?.status === 401) {
    refreshTokenRequest = refreshTokenRequest || refresh();

    await refreshTokenRequest;

    refreshTokenRequest = null;

    if (error.config) {
      return axiosInstance(error.config);
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
