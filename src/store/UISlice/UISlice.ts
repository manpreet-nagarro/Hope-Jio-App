import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type EditorMode = "wireframe" | "preview" | "list";

interface UIState {
  isGlobalSidebarCollapsed: boolean;
  isComponentLibraryCollapsed: boolean;
  editorMode: EditorMode;
  isConfigurationOpen: boolean;
  configurationActiveTab: 0 | 1;
}

const initialState: UIState = {
  isGlobalSidebarCollapsed: false,
  isComponentLibraryCollapsed: true,
  editorMode: "wireframe",
  isConfigurationOpen: false,
  configurationActiveTab: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleGlobalSidebar(state) {
      state.isGlobalSidebarCollapsed = !state.isGlobalSidebarCollapsed;
    },

    setGlobalSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.isGlobalSidebarCollapsed = action.payload;
    },

    toggleComponentLibrary(state) {
      state.isComponentLibraryCollapsed = !state.isComponentLibraryCollapsed;
    },

    setEditorMode(state, action: PayloadAction<EditorMode>) {
      state.editorMode = action.payload;
    },

    resetEditorUI(state) {
      state.editorMode = "wireframe";
      state.isComponentLibraryCollapsed = true;
    },

    openConfigurationDrawer(state) {
      state.isConfigurationOpen = true;
    },
    closeConfigurationDrawer(state) {
      state.isConfigurationOpen = false;
    },
    setConfigurationActiveTab: (state, action: PayloadAction<0 | 1>) => {
      state.configurationActiveTab = action.payload;
    },
  },
});

export const {
  toggleGlobalSidebar,
  setGlobalSidebarCollapsed,
  toggleComponentLibrary,
  setEditorMode,
  resetEditorUI,
  openConfigurationDrawer,
  closeConfigurationDrawer,
  setConfigurationActiveTab,
} = uiSlice.actions;

export default uiSlice.reducer;
