import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  IFilters,
  IWireframe,
  IWireframeFilterData,
  IWireframesApiResponse,
} from "@interfaces/Wireframes";
import type { ICreateWireframePayload } from "@interfaces/createPageModal";
import { WIREFRAME_CREATED, WIREFRAME_DUPLICATED } from "../utils/messages";
import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";
import { useDispatch } from "react-redux";
import { setSelectedWireframe } from "../store/wireframeSlice/wireframeSlice";
import { setSlots } from "../store/slotsSlice/slotsSlice";
import {
  createEmptySlot,
  updateSlotComponentsWithDimensions,
} from "../components/slotEditorCanvas/utils/slotUtils";
import { UI_TEXTS } from "@constants/text.constants";
import { fetchFilters } from "@api/common.api";
import { archiveWireframe, createWireframe, duplicateWireframe, fetchWireframes } from "@api/wireframe.api";

export const useWireframes = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { show } = useToast();

  const [hasUserSearched, setHasUserSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState<IFilters>({
    searchText: "",
    store: undefined,
    platform: undefined,
    status: undefined,
    userCohorts: undefined,
  });

  const { data: filterData } = useQuery<IWireframeFilterData>({
    queryKey: ["wireframe-filters"],
    queryFn: fetchFilters,
    refetchOnWindowFocus: false,
  });

  const { data, isError, isLoading, isFetching } =
    useQuery<IWireframesApiResponse>({
      queryKey: ["wireframes", page, size, filters],
      queryFn: () => fetchWireframes(page, size, filters),
      placeholderData: (previousData) => previousData,
      refetchOnWindowFocus: false,
    });

  const createWireframeMutation = useMutation({
    mutationFn: createWireframe,
    onError: (error: any) => {
      show({
        message:
          error?.response?.data?.detailed_message ||
          error?.message ||
          "Something went wrong",
        severity: "error",
      });
    },
    onSuccess: () => {
      show({ message: WIREFRAME_CREATED });
      queryClient.invalidateQueries({ queryKey: ["wireframes"] });
    },
  });

  const duplicateWireframeMutation = useMutation({
    mutationFn: duplicateWireframe,
    onError: (error) => {
      console.error(UI_TEXTS.ERRORS.WIREFRAME_DUPLICATE_FAILED, error);
      show({
        message: UI_TEXTS.ERRORS.WIREFRAME_DUPLICATE_FAILED,
        severity: "error",
      });
    },
    onSuccess: () => {
      show({ message: WIREFRAME_DUPLICATED });
      queryClient.invalidateQueries({ queryKey: ["wireframes"] });
    },
  });

  const archiveWireframeMutation = useMutation({
    mutationFn: archiveWireframe,
    onSuccess: () => {
      show({ message: UI_TEXTS.MESSAGES.WIREFRAME_ARCHIVED_SUCCESS });
      queryClient.invalidateQueries({ queryKey: ["wireframes"] });
    },
    onError: (error) => {
      show({
        message: UI_TEXTS.ERRORS.WIREFRAME_ARCHIVE_FAILED,
        severity: "error",
      });
      console.error(UI_TEXTS.ERRORS.WIREFRAME_ARCHIVE_FAILED, error);
    },
  });

  const handleOpenEditor = (wireframeId: string, wireframe: IWireframe) => {
    dispatch(setSelectedWireframe(wireframe));
    const updatedSlots = updateSlotComponentsWithDimensions(
      wireframe.slots || [],
    );
    dispatch(
      setSlots(updatedSlots.length ? updatedSlots : [createEmptySlot()]),
    );
    navigate(`/wireframe/editor/${wireframeId}`);
  };

  return {
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
    handleOpenEditor,
    onSearch: (newFilters: IFilters) => {
      setFilters(newFilters);
      setPage(1);
      setHasUserSearched(true);
    },
    onCreate: (payload: ICreateWireframePayload) =>
      createWireframeMutation.mutateAsync({ ...payload }),
    isSaving: createWireframeMutation.isPending,
    isWireframePageCopyingStatus: duplicateWireframeMutation.status,
    onDuplicate: (wireframeId: string, wireframeName?: string) =>
      duplicateWireframeMutation.mutate({ wireframeId, wireframeName }),
    onArchiveWireframe: (wireframeId: string) => archiveWireframeMutation.mutate(wireframeId),
    archivingWireframeStatus: archiveWireframeMutation.status,
    onPageSizeChange: (newSize: number) => {
      setSize(newSize);
      setPage(1);
    },
  };
};

export default useWireframes;
