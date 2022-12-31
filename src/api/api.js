import axios from "axios";

// Axios Interceptor
// https://www.youtube.com/watch?v=Cyyh9G5E6II

const BASE_URL = window.location.host.includes("localhost")
  ? "http://localhost:8000"
  : "/";

const client = axios.create({
  baseURL: BASE_URL,
});

export const request = ({ ...options }) => {
  client.interceptors.request.use(
    (interceptRequest) => {
      return interceptRequest;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const onSucess = (response) => response;

  const onError = (error) => {
    if (!!error.response.status) {
      return { error: error.response.data };
    }
    return Promise.reject(error);
  };

  return client(options).then(onSucess).catch(onError);
};

export const api = {
  get: (url, params) => request({ url: encodeURI(url), ...params }),
  post: (url, data, responseType = "json") =>
    request({ url, method: "post", data, responseType }),
  put: (url, data) => request({ url, method: "put", data }),
  patch: (url, params, data) => request({ url, method: "patch", data, params }),
  delete: (url) => request({ url, method: "delete" }),
  makeRequest: request,
};
