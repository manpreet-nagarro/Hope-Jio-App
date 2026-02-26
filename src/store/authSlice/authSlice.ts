import { createSlice } from "@reduxjs/toolkit";
import { initAuth } from "./authThunks";

export interface AuthState {
  initialized: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  initialized: false,
  isAuthenticated: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAuth.fulfilled, (state, action) => {
      state.initialized = true;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
    });

    builder.addCase(initAuth.rejected, (state) => {
      state.initialized = true;
      state.isAuthenticated = false;
    });
  },
});

export const { setAuth, clearAuth, setInitialized } = authSlice.actions;
export default authSlice.reducer;
