import { useDynamicQueryQuery, useDynamicMutationMutation } from "./baseApi";

export const useDynamicQuery = <TResponse = any, TParams = any>() =>
  useDynamicQueryQuery as unknown as (
    args: { url: string; params?: TParams }
  ) => { data?: TResponse; isLoading: boolean; error?: any };

export const useDynamicMutation = <TResponse = any, TBody = any>() =>
  useDynamicMutationMutation as unknown as [
    (args: { url: string; method?: "POST" | "PUT" | "PATCH" | "DELETE"; body?: TBody }) => Promise<TResponse>,
    { isLoading: boolean; error?: any }
  ];
