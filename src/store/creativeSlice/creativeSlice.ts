import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Hotspot } from "../../components/creativeWorkflow/steps/HotspotsProperties/hotspot.types";

interface StepperState {
  activeStep: number;
  link: string;
  urls: string[];
  hotspots: Hotspot[];
}

const initialState: StepperState = {
  activeStep: 0,
  link: "",
  urls: [],
  hotspots: [],
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
    setUrls: (state, action: PayloadAction<string[]>) => {
      state.urls = action.payload;
    },
    addUrl: (state, action: PayloadAction<string>) => {
      state.urls.push(action.payload);
    },
    removeUrl: (state, action: PayloadAction<number>) => {
      state.urls.splice(action.payload, 1);
    },
    setHotspots(state, action) {
      state.hotspots = action.payload;
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setLink,
  setUrls,
  addUrl,
  removeUrl,
  setHotspots,
} = stepperSlice.actions;
export default stepperSlice.reducer;
