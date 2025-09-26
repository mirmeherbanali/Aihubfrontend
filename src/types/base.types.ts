// Generic arguments for queries/mutations
export interface DynamicQueryArgs<TParams = any> {
  url: string;
  params?: TParams;
}

export interface DynamicMutationArgs<TBody = any> {
  url: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
}