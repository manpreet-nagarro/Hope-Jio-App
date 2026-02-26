import { NAVIGATION_API_BASE_URL } from "./api-paths";
import { apiFetch } from "./ApiFetcher";
import type { INavigationDataResponse } from "src/interfaces/Sidebar";

export const fetchNavigation = (): Promise<INavigationDataResponse> => {
  return apiFetch<INavigationDataResponse>(
    NAVIGATION_API_BASE_URL + "/api/user/context",
  );
};
