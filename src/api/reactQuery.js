import { api } from "./api";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const fetcher = ({ queryKey, pageParam }) => {
  const [url, params] = queryKey;

  return api
    .get(url, { params: { ...params, ...pageParam } })
    .then((res) => res.data);
};

export const useLoadMore = (url, params) => {
  return useInfiniteQuery(
    [url, params],
    ({ queryKey, pageParam = 1 }) =>
      fetcher({ queryKey, pageParam, meta: undefined }),
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => {
        return lastPage.nextId ?? false;
      },
    }
  );
};

export const usePrefetch = (url, params) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery([url, params], ({ queryKey }) =>
      fetcher({ queryKey, meta: undefined })
    );
  };
};

/**
 *
 * @param {string} url
 * @param {object} params
 * @param {useQuery.options} config
 * @returns
 */
export const useFetch = (url, params, config) => {
  return useQuery(
    [url, params],
    ({ queryKey, param }) => fetcher({ queryKey, param, meta: undefined }),
    {
      enabled: !!url,
      ...config,
    }
  );
};

const useGenericMutation = (
  func,
  url,
  params,
  _updater,
  querytoInvaliate,
  options
) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onError: (_err, _, context) => {
      queryClient.setQueryData([url, params], context);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(querytoInvaliate);
    },
    ...options,
  });
};

export const useDelete = (url, params, updater, querytoInvaliate) => {
  return useGenericMutation(
    () => api.delete(url),
    url,
    params,
    updater,
    querytoInvaliate
  );
};

export const usePost = (
  url,
  params,
  updater,
  querytoInvaliate,
  responseType = "json",
  useMutationOptions = {}
) => {
  return useGenericMutation(
    (data) => api.post(url, data, responseType),
    url,
    params,
    updater,
    querytoInvaliate,
    useMutationOptions
  );
};

export const usePut = (url, params, updater, querytoInvaliate, options) => {
  return useGenericMutation(
    (data) => api.put(url, data),
    url,
    params,
    updater,
    querytoInvaliate,
    options
  );
};

export const usePatch = (url, params, updater) =>
  useGenericMutation(
    (data) => api.patch(url, params, data),
    url,
    params,
    updater
  );

/**
 * Custom react query hook for edge case scenarios
 *
 * @param {{url: string, method: 'post' | 'get' | 'put' | 'patch' | 'delete', data:any, options: UseQueryOptions, makeRequestOptions: AxiosInstance, params: object }} props
 */
export const useCustomQuery = ({
  url,
  method = "get",
  params,
  data,
  options,
  makeRequestOptions,
}) => {
  const fn = ({ queryKey }) => {
    const [endpoint, payload] = queryKey;
    return api.makeRequest({
      url: endpoint,
      method,
      data: payload,
      params,
      ...makeRequestOptions,
    });
  };

  return useQuery([url, data], fn, { ...options });
};

// Default export to list all the above, to get a clear picture
export default {
  fetcher, // Get request, no react query
  usePut, // useGenericMutation with put request
  usePost, // useGenericMutation with post request
  useFetch, // fetched combined with useQuery
  usePatch, // useGenericMutation with patch request
  useDelete, // useGenericMutation with delete request
  useLoadMore, // useInfiniteQuery
  usePrefetch, // prefetch a query
  useCustomQuery, // Completely custom, useQuery
  useGenericMutation, // Mutator
};
