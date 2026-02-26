import { Outlet } from "react-router-dom";
import Sidebar from "@components/sidebar/sidebar";
import ComponentLibrary from "@components/wireframeEditor/componentLibrary/componentLibrary";
import Header from "@components/header/header";
import EditorHeader from "@components/wireframeEditor/editorHeader/editorHeader";
import { useDispatch, useSelector } from "react-redux";
import { resetEditorUI } from "@store/UISlice/UISlice";
import type { RootState } from "@store/store";
import {
  ComponentLibrarySlot,
  EditorCanvasSlot,
  EditorHeaderSlot,
  EditorLayoutContainer,
  GlobalHeaderSlot,
  GlobalSidebarSlot,
} from "./editorLayout.styles";
import { useCallback, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@hooks/useToast";
import Toast from "@components/Toast/Toast";
import type {
  ISaveWireframeCanvasPayload,
} from "@interfaces/wireframeEditor";

import  { buildSavePayload, saveWireframeCanvas } from "@api/wireframeEditor.api";
import { ConfigurationDrawer } from "@components/ConfigurationDrawer/ConfigurationDrawer";

const EditorLayout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { show } = useToast();

  useEffect(() => {
    dispatch(resetEditorUI());
  }, [dispatch]);

  const isGlobalSidebarCollapsed = useSelector(
    (state: RootState) => state.ui.isGlobalSidebarCollapsed,
  );

  const isComponentLibraryCollapsed = useSelector(
    (state: RootState) => state.ui.isComponentLibraryCollapsed,
  );

  const selectedWireframe = useSelector(
    (state: RootState) => state.wireframe.selectedWireframe,
  );

  const slots = useSelector((state: RootState) => {
    return state.slots.slots;
  });

  const GLOBAL_SIDEBAR_WIDTH = isGlobalSidebarCollapsed ? 112 : 260;
  const COMPONENT_LIBRARY_WIDTH = isComponentLibraryCollapsed ? 64 : 280;

  const saveWireframeCanvasMutation = useMutation({
    mutationFn: (payload: ISaveWireframeCanvasPayload) => 
      saveWireframeCanvas(payload),
    onSuccess: () => {
      show({
        message: "Wireframe Screens saved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["wireframe-by-id"] });
    },
    onError: () => {
      show({
        message: "Failed to save Wireframe Screens",
      });
    },
  });

  const handleSave = useCallback(() => {
    if (!selectedWireframe) return;

    const payload = buildSavePayload(selectedWireframe, slots);
    saveWireframeCanvasMutation.mutate(payload);
  }, [selectedWireframe, slots, saveWireframeCanvasMutation]);

  return (
    <EditorLayoutContainer
      globalSidebarWidth={GLOBAL_SIDEBAR_WIDTH}
      componentLibraryWidth={COMPONENT_LIBRARY_WIDTH}
    >
      {/* column 1: Global Sidebar */}
      <GlobalSidebarSlot>
        <Sidebar />
      </GlobalSidebarSlot>

      {/* column 2: component library */}
      <ComponentLibrarySlot>
        <ComponentLibrary />
      </ComponentLibrarySlot>

      {/* column 3 : Global Header */}
      <GlobalHeaderSlot>
        <Header />
      </GlobalHeaderSlot>

      {/* column 4 : editor Header */}
      <EditorHeaderSlot>
        <EditorHeader onSave={handleSave} isSaveInProgress={saveWireframeCanvasMutation.isPending} />
      </EditorHeaderSlot>

      <EditorCanvasSlot>
        <Outlet />
      </EditorCanvasSlot>
      <ConfigurationDrawer />
      <Toast />
    </EditorLayoutContainer>
  );
};

export default EditorLayout;
