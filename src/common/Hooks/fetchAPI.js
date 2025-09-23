const fetchAPI = async ({
  url,
  method = "POST",
  headers = {},
  body = null,
  timeout = 10000,
  cache = "no-store",
  returnFullResponse = false,
  authToken = null,
  retries = 3,
  refreshTokenFn,
}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const options = {
    method: method.toUpperCase(),
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    signal: controller.signal,
    credentials: "include",
    cache,
  };
  if (body && method.toUpperCase() !== "GET") {
    options.body = isFormData ? body : JSON.stringify(body);
  }
  const attemptRequest = async (attempt = 1) => {
    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get("content-type");
      const isJson = contentType?.includes("application/json");
      const data = isJson ? await response.json() : await response.text();
      if (!response.ok) {
        if (response.status === 401 && refreshTokenFn && attempt <= retries) {
          const newToken = await refreshTokenFn();
          return fetchAPI({
            url,
            method,
            headers,
            body,
            timeout,
            cache,
            returnFullResponse,
            authToken: newToken,
            retries,
            refreshTokenFn,
          });
        }
        throw new Error(data?.message || `HTTP error! Status: ${response.status}`);
      }
      if (returnFullResponse) {
        return {
          data,
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        };
      }
      return data;
    } catch (error) {
      if (attempt < retries) {
        return attemptRequest(attempt + 1);
      }
      throw error;
    }
  };
  try {
    return await attemptRequest();
  } finally {
    clearTimeout(timeoutId);
  }
};

export default fetchAPI;
