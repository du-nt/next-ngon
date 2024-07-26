import axiosInstance from "@/libs/axios_instance";
import {
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export function useCustomQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "initialData"
  > & { initialData?: () => undefined } & { config?: AxiosRequestConfig }
): UseQueryResult<TData, TError> {
  const { config, ...restOptions } = options || {};

  const defaultQueryFn: QueryFunction<TQueryFnData, TQueryKey> = ({
    queryKey,
  }: QueryFunctionContext) => {
    const url = queryKey?.[0];

    if (typeof url === "string") {
      return axiosInstance(url, { ...config, method: config?.method || "GET" });
    }

    throw new Error("Invalid URL");
  };

  return useQuery({
    queryKey,
    queryFn: defaultQueryFn,
    ...restOptions,
  });
}
