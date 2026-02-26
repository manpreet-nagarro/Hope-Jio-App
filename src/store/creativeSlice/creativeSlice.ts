import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StepperState {
  activeStep: number;
  link: string;
}

const initialState: StepperState = {
  activeStep: 0,
  link: "",
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    nextStep: (state) => {
      state.activeStep += 1;
    },
    prevStep: (state) => {
      if (state.activeStep > 0) {
        state.activeStep -= 1;
      }
    },
    setLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
  },
});

export const { setStep, nextStep, prevStep, setLink } = stepperSlice.actions;
export default stepperSlice.reducer;
