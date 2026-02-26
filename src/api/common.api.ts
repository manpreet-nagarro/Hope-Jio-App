import { WIREFRAMES_API_BASE_URL } from "@api/api-paths";
import { apiFetch } from "@api/ApiFetcher";
import type { IFilterApiResponse, IWireframeFilterData } from "@interfaces/Wireframes";

export const fetchFilters = async (): Promise<IWireframeFilterData> => {
  const response = await apiFetch<IFilterApiResponse>(
    `${WIREFRAMES_API_BASE_URL}/api/wireframes/filter`,
  );

  return response.data;
};