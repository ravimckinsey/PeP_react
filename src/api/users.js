import { pathToUrl } from "../utils";
import { useFetch } from "./reactQuery";
import { apiRoutes } from "./routes";

export const useGetUsers = (config) =>
  useFetch(pathToUrl(apiRoutes.getUserData), undefined, {
    staleTime: Infinity,
    ...config,
  });

export const useGetSerchedUsers = (keyword, config) =>
  useFetch(pathToUrl(apiRoutes.getSeaarchUserData, { keyword }), undefined, {
    ...config,
  });
