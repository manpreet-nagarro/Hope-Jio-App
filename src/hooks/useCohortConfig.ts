import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import type { AppDispatch } from "@store/store";
import { fetchCohortConfig } from "@api/cohortConfig.api";
import { setCohortConfigData, type ExperimentResponse } from "@store/cohortConfigSlice/cohortConfigSlice";

export const useCohortConfig = () => {
  const dispatch = useDispatch<AppDispatch>();

  const query = useQuery<ExperimentResponse>({
    queryKey: ["cohortConfig"],
    queryFn: fetchCohortConfig,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (query.data?.data) {
      dispatch(setCohortConfigData(query.data.data));
    }
  }, [query.data?.data, dispatch]);

  return {
    ...query,
    cohortConfig: query.data?.data ?? null,
  };
};