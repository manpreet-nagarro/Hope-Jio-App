import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IFilters, IWireframeFilterData } from "@interfaces/Wireframes";
import type { IURLApiResponse, IUrlManager } from "@interfaces/URLManager";
import { useToast } from "./useToast";
import { UI_TEXTS } from "@constants/text.constants";
import { fetchFilters } from "@api/common.api";
import { createURL, editURL, fetchUrls } from "@api/urlmanager.api";

export const useUrls = () => {
  const queryClient = useQueryClient();
  const { show } = useToast();
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [editingRowData, setEditingRowData] = useState<IUrlManager | null>(null);
  const [hasUserSearched, setHasUserSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState<IFilters>({
    searchText: "",
    store: undefined,
    platform: undefined,
    userCohorts: undefined,
    status: undefined,
  });

  const { data: filterData } = useQuery<IWireframeFilterData>({
    queryKey: ["url-filters"],
    queryFn: fetchFilters,
    refetchOnWindowFocus: false,
  });

  const { data, isError, isLoading, isFetching } = useQuery<IURLApiResponse>({
    queryKey: ["urls", page, size, filters],
    queryFn: () => fetchUrls(page, size, filters),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });

  const createURLMutation = useMutation({
    mutationFn: createURL,
    onError: (error) => {
      console.error("Create url failed", error);
      const customMessage = error instanceof Error ? error.message : UI_TEXTS.ERRORS.URL_CREATION_FAILED;
      show({ message: customMessage, severity: "error" });
    },
    onSuccess: () => {
      show({ message: UI_TEXTS.MESSAGES.URL_CREATED_SUCCESS });
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      setIsUrlModalOpen(false);
      setEditingRowData(null);
    },
  });

  const editURLMutation = useMutation({
    mutationFn: editURL,
    onError: (error) => {
      console.error("Edit url failed", error);
      const customMessage = error instanceof Error ? error.message : UI_TEXTS.ERRORS.URL_EDIT_FAILED;
      show({ message: customMessage, severity: "error" });
    },
    onSuccess: () => {
      show({ message: UI_TEXTS.MESSAGES.URL_UPDATED_SUCCESS });
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      setIsUrlModalOpen(false);
      setEditingRowData(null);
    },
  });

  return {
    isUrlModalOpen,
    setIsUrlModalOpen,
    editingRowData,
    setEditingRowData,
    filterData,
    data,
    isError,
    isLoading,
    isFetching,
    page,
    setPage,
    size,
    setSize,
    hasUserSearched,
    setHasUserSearched,
    filters,
    setFilters,
    onSearch: (newFilters: IFilters) => {
      setFilters(newFilters);
      setPage(1);
      setHasUserSearched(true);
    },
    onCreate: (payload: IUrlManager) =>
      createURLMutation.mutate({ ...payload }),
    onEdit: (payload: IUrlManager) =>
      editURLMutation.mutate({ ...payload }),
    isSaving: createURLMutation.isPending || editURLMutation.isPending,
    onPageSizeChange: (newSize: number) => {
      setSize(newSize);
      setPage(1);
    },
  };
};

export default useUrls;
