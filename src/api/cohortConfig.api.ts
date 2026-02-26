import type { ExperimentResponse } from "@store/cohortConfigSlice/cohortConfigSlice";
import { WIREFRAMES_API_BASE_URL } from "./api-paths";
import { apiFetch } from "./ApiFetcher";

export const fetchCohortConfig = async (): Promise<ExperimentResponse> => {
  return apiFetch(`${WIREFRAMES_API_BASE_URL}/api/cohort/config`);
};
