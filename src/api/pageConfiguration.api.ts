import { WIREFRAMES_API_BASE_URL } from "./api-paths";
import { apiFetch } from "./ApiFetcher";

export interface PageConfigurationPayload {
  slug: string;
  page_name: string;
  page_description: string;
  modifiedBy: string;
  seo: {
    title: string;
    page_title: string;
    description: string;
    keywords: string[];
    topDescription: string;
    bottomDescription: string;
    breadcrumbs: unknown[];
    meta_tags: unknown[];
    canonical_url: string;
    canonical_url_domain: string;
    sitemap: {
      priority: number | null;
      frequency: string | null;
    };
  };
}

export const postPageConfiguration = (
  wireframeId: string,
  payload: PageConfigurationPayload,
) => {
  return apiFetch(
    `${WIREFRAMES_API_BASE_URL}/api/wireframes/${wireframeId}/settings`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  );
};
