import { pathToUrl } from "../utils";
import { useFetch } from "./reactQuery";
import { apiRoutes } from "./routes";

export const useGetUsers = (keyword, config) =>
  useFetch(
    pathToUrl(apiRoutes.getUserData),
    { first_name_like: keyword },
    {
      ...config,
    }
  );
