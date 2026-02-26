import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TenantRoleAccess } from "src/interfaces/Sidebar";

interface NavigationState {
  data: TenantRoleAccess | null;
  loading: boolean;
  error: string | null;
}

const initialState: NavigationState = {
  data: null,
  loading: false,
  error: null,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigationLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNavigationData: (state, action: PayloadAction<TenantRoleAccess>) => {
      state.data = action.payload;
      state.error = null;
    },
    setNavigationError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setNavigationLoading,
  setNavigationData,
  setNavigationError,
} = navigationSlice.actions;

export default navigationSlice.reducer;
