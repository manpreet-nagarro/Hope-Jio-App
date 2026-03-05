import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Hotspot } from "../../components/creativeWorkflow/steps/HotspotsProperties/hotspot.types";

interface StepperState {
  activeStep: number;
  link: string;
  urls: string[];
  hotspots: Hotspot[];
  visitedSteps: number[];
  isSubmitting: boolean;
  completedSteps: number[];
}

const initialState: StepperState = {
  activeStep: 0,
  link: "",
  urls: [],
  hotspots: [],
  visitedSteps: [0],
  isSubmitting: false,
  completedSteps: [],
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
      // Add this step to visited steps if not already there
      if (!state.visitedSteps.includes(action.payload)) {
        state.visitedSteps.push(action.payload);
      }
    },
    nextStep: (state) => {
      state.activeStep += 1;
      // Add next step to visited steps
      if (!state.visitedSteps.includes(state.activeStep)) {
        state.visitedSteps.push(state.activeStep);
      }
    },
    prevStep: (state) => {
      if (state.activeStep > 0) {
        state.activeStep -= 1;
      }
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
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
    markStepCompleted: (state, action: PayloadAction<number>) => {
      if (!state.completedSteps.includes(action.payload)) {
        state.completedSteps.push(action.payload);
      }
    },
    resetStepsAfter: (state, action: PayloadAction<number>) => {
      const stepIndex = action.payload;

      state.completedSteps = state.completedSteps.filter(
        (step) => step <= stepIndex,
      );

      state.visitedSteps = state.visitedSteps.filter(
        (step) => step <= stepIndex,
      );
      state.hotspots = [];
    },
    setApprovalSent: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
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
  setIsSubmitting,
  markStepCompleted,
  resetStepsAfter,
  setApprovalSent,
} = stepperSlice.actions;
export default stepperSlice.reducer;
