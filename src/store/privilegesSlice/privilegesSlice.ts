import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  privileges: [] as string[],
};

export const privilegesSlice = createSlice({
  name: "privileges",
  initialState,
  reducers: {
    setPrivileges: (state, action: PayloadAction<string[]>) => {
      state.privileges = action.payload;
    },
  },
});
export const { setPrivileges } = privilegesSlice.actions;
export default privilegesSlice.reducer;