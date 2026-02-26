import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IWireframe } from "src/interfaces/Wireframes";
import { setSlots } from "../slotsSlice/slotsSlice";
import { createEmptySlot } from "../../components/slotEditorCanvas/utils/slotUtils";
import type { AppDispatch, RootState } from "../store";

type WireframeState = {
  isOverlayOpen: boolean;
  selectedWireframeId: string | null;
  isUrlMapperOpen?: boolean;
  selectedWireframe?: IWireframe | null;
  isPageConfigOpen: boolean;
  pageConfigWireframe: IWireframe | null;
};

const initialState: WireframeState = {
  isOverlayOpen: false,
  selectedWireframeId: null,
  isUrlMapperOpen: false,
  selectedWireframe: null,
  isPageConfigOpen: false,
  pageConfigWireframe: null,
};

const wireframeSlice = createSlice({
  name: "wireframe",
  initialState,
  reducers: {
    openOverlay(state, action: PayloadAction<string>) {
      state.isOverlayOpen = true;
      state.selectedWireframeId = action.payload;
    },
    closeOverlay(state) {
      state.isOverlayOpen = false;
      state.selectedWireframeId = null;
    },
    urlMapperOverlay(state, action: PayloadAction<IWireframe>) {
      state.isUrlMapperOpen = true;
      state.selectedWireframe = action.payload;
    },
    closeUrlMapperOverlay(state) {
      state.isUrlMapperOpen = false;
      state.selectedWireframe = null;
    },
    openPageConfigDrawer(state, action: PayloadAction<IWireframe>) {
      state.isPageConfigOpen = true;
      state.pageConfigWireframe = action.payload;
    },
    closePageConfigDrawer(state) {
      state.isPageConfigOpen = false;
      state.pageConfigWireframe = null;
    },
    setSelectedWireframe(state, action: PayloadAction<IWireframe>) {
      state.selectedWireframe = action.payload;
      state.selectedWireframeId = action.payload.wireframeId ?? null;
    },
    clearSelectedWireframe(state) {
      state.selectedWireframe = null;
      state.selectedWireframeId = null;
    },
  },
});

export const {
  openOverlay,
  closeOverlay,
  urlMapperOverlay,
  closeUrlMapperOverlay,
  openPageConfigDrawer,
  closePageConfigDrawer,
  setSelectedWireframe,
  clearSelectedWireframe,
} = wireframeSlice.actions;
export default wireframeSlice.reducer;

// Thunk to restore slots from the selected wireframe stored in this slice
export const restoreSlotsFromSelected = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const selected: IWireframe | null | undefined = state.wireframe?.selectedWireframe;
  if (!selected) return;

  dispatch(setSlots(selected.slots.length ? selected.slots : [createEmptySlot()]));
};
