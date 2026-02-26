import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AlertColor, SnackbarOrigin } from "@mui/material";

export interface ToastState {
  open: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration: number;
  anchorOrigin: SnackbarOrigin;
}

const initialState: ToastState = {
  open: false,
  message: "",
  severity: "success",
  autoHideDuration: 3000,
  anchorOrigin: { vertical: "top", horizontal: "center" },
};

export interface ShowToastPayload {
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
}

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ShowToastPayload>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "success";
      state.autoHideDuration = action.payload.autoHideDuration || 3000;
      state.anchorOrigin = action.payload.anchorOrigin || {
        vertical: "top",
        horizontal: "center",
      };
    },
    closeToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
