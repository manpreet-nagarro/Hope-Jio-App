import type { IComponentLibraryResponse } from "@interfaces/wireframeEditor";
import { apiFetch } from "./ApiFetcher";
import { WIREFRAMES_API_BASE_URL } from "./api-paths";

export const fetchComponentLibrary = async (): Promise<IComponentLibraryResponse> => {
  const response = await apiFetch<IComponentLibraryResponse>(
    `${WIREFRAMES_API_BASE_URL}/api/components/library`,
  );
  return response;
};