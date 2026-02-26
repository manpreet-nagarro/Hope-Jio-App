import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import type { INavigationDataResponse } from "src/interfaces/Sidebar";
import { setNavigationData } from "@store/navigatonSlice/navigationSlice";
import type { AppDispatch, RootState } from "@store/store";
import { fetchNavigation } from "../api/navigation.api";
import { useEffect } from "react";
import { setPrivileges } from "@store/privilegesSlice/privilegesSlice";

export const useUserContext = () => {
  const dispatch = useDispatch<AppDispatch>();
   const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const { data, ...query } = useQuery<INavigationDataResponse>({
    queryKey: ["navigation"],
    queryFn: fetchNavigation,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: isAuthenticated
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setNavigationData(data.data));
      dispatch(setPrivileges(data?.data?.privileges || []));
    }
  }, [data, dispatch]);

  return { data, ...query };
};
