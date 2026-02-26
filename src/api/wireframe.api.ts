import { WIREFRAMES_API_BASE_URL } from "@api/api-paths";
import { apiFetch } from "@api/ApiFetcher";
import type { ICreateWireframePayload } from "@interfaces/createPageModal";
import type {
  IWireframe,
  IWireframesApiResponse,
} from "@interfaces/Wireframes";

export const fetchWireframeById = async (
  wireframeId: string,
): Promise<IWireframe> => {
  const response = await apiFetch<{
    data: IWireframe;
  }>(`${WIREFRAMES_API_BASE_URL}/api/wireframes/${wireframeId}`);
  return response.data;
};

export const fetchWireframes = async (
  page: number,
  size: number,
  filters: {
    searchText?: string;
    store?: string;
    platform?: string;
    status?: string;
    userCohorts?: string;
  },
): Promise<IWireframesApiResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (filters.searchText) params.append("search", filters.searchText);
  if (filters.store) params.append("store", filters.store);
  if (filters.platform) params.append("platform", filters.platform);
  if (filters.status) params.append("status", filters.status);
  if (filters.userCohorts) params.append("userCohorts", filters.userCohorts);

  const response = await apiFetch<IWireframesApiResponse>(
    `${WIREFRAMES_API_BASE_URL}/api/wireframes?${params.toString()}`,
  );

  return {
    data: response.data,
    pagination: response.pagination,
  };
};

export const createWireframe = async (payload: ICreateWireframePayload) => {
  const apiPayload = {
    wireframeName: payload.wireframeName,
    slug: payload.slug,
    platform: payload.platformName,
    store: payload.store,
    actionType: payload.actionType,
    sourceWireframeid:
      payload.actionType === "COPY" ? payload.sourceWireframeid : "",
  };
  return apiFetch(`${WIREFRAMES_API_BASE_URL}/api/wireframes`, {
    method: "POST",
    body: JSON.stringify(apiPayload),
  });
};

export const duplicateWireframe = async ({
  wireframeId,
  wireframeName,
}: {
  wireframeId: string;
  wireframeName?: string;
}) => {
  const payload = {
    actionType: "COPY",
    sourceWireframeid: wireframeId,
    ...(wireframeName ? { wireframeName } : {}),
  };
  return apiFetch(`${WIREFRAMES_API_BASE_URL}/api/wireframes`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const deleteWireframe = async (wireframeId: string) => {
  return apiFetch(`${WIREFRAMES_API_BASE_URL}/api/wireframes/${wireframeId}`, {
    method: "DELETE",
  });
};

export const archiveWireframe = async (wireframeId: string) => {
  return apiFetch(
    `${WIREFRAMES_API_BASE_URL}/api/wireframes/${wireframeId}/archive`,
    {
      method: "PUT",
    },
  );
};
