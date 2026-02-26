import { WIREFRAMES_API_BASE_URL } from "@api/api-paths";
import { apiFetch } from "@api/ApiFetcher";
import type { IURLApiResponse, IUrlManager } from "@interfaces/URLManager";

export const fetchUrls = async (
  page: number,
  size: number,
  filters: {
    searchText?: string;
    store?: string;
    platform?: string;
    status?: string;
    userCohorts?: string;
  },
): Promise<IURLApiResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filters.searchText) params.append("searchTerm", filters.searchText);
  if (filters.store) params.append("store", filters.store);
  if (filters.platform) params.append("platform", filters.platform);
  if (filters.userCohorts) params.append("userCohorts", filters.userCohorts);

  const response = await apiFetch<IURLApiResponse>(
    `${WIREFRAMES_API_BASE_URL}/api/urls?${params.toString()}`,
  );

  return {
    data: response.data,
    pagination: response.pagination,
  };
};

export const createURL = async (payload: IUrlManager) => {
  const {
    slug,
    platform,
    store,
    userCohorts,
    scheduleStart,
    scheduleEnd,
    wireframeId
  } = payload;
  const apiPayload = {
    wireframeId,
    slug,
    platform,
    store,
    userCohorts,
    scheduleStart,
    scheduleEnd
  };
  return apiFetch(`${WIREFRAMES_API_BASE_URL}/api/urls`, {
    method: "POST",
    body: JSON.stringify(apiPayload),
  });
};

export const editURL = async (payload: IUrlManager) => {
  const {
    slug,
    platform,
    store,
    userCohorts,
    scheduleStart,
    scheduleEnd,
    wireframeId,
    id
  } = payload;
  const apiPayload = {
    wireframeId,
    slug,
    platform,
    store,
    userCohorts,
    scheduleStart,
    scheduleEnd
  };
  return apiFetch(`${WIREFRAMES_API_BASE_URL}/api/urls/${id}`, {
    method: "PUT",
    body: JSON.stringify(apiPayload),
  });
};