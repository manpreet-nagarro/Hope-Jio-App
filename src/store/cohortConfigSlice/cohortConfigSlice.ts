import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ExperimentResponse {
  status: string;
  status_code: number;
  status_message: string;
  detailed_message: string;
  data: CohortConfigData;
}

export interface CohortConfigData {
  experiments: string[];
  userGroup: UserGroup[];
  slotTypes: SlotType[];
}

export interface UserGroup {
  id: number;
  name: string;
}

export interface SlotType {
  label: string;
  props: [];
}

interface CohortConfigState {
  data: CohortConfigData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CohortConfigState = {
  data: null,
  loading: false,
  error: null,
};

const cohortConfigSlice = createSlice({
  name: "cohortConfig",
  initialState,
  reducers: {
    setCohortConfigLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCohortConfigData: (
      state,
      action: PayloadAction<CohortConfigData>
    ) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCohortConfigError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCohortConfigLoading,
  setCohortConfigData,
  setCohortConfigError,
} = cohortConfigSlice.actions;

export default cohortConfigSlice.reducer;