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
/**
 * Converts stepcode coming from API to step index
 */
const normalizeSteps = (stepcode: string = "template_preview"): number => {
  switch (stepcode?.toLowerCase()) {
    case "task_brief":
    case "task brief":
    case "task-brief":
      return 0;

    case "template_preview":
    case "template preview":
    case "template-preview":
      return 1;

    case "hotspots_properties":
    case "hotspots properties":
    case "hotspots-properties":
      return 2;

    case "review_submit":
    case "review submit":
    case "review-submit":
      return 3;

    default:
      return 0;
  }
};
const initialState: StepperState = {
  activeStep: normalizeSteps("Task Brief"),
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
    setStep: (state, action: PayloadAction<string | number>) => {
      console.log("step", action.payload);
      const step =
        typeof action.payload === "number"
          ? action.payload
          : normalizeSteps(action.payload);

      state.activeStep = step;
      if (!state.visitedSteps.includes(step)) {
        state.visitedSteps.push(step);
      }
    },

    nextStep: (state) => {
      state.activeStep += 1;

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

    setHotspots: (state, action: PayloadAction<Hotspot[]>) => {
      state.hotspots = action.payload;
    },

    markStepCompleted: (state, action: PayloadAction<string | number>) => {
      console.log(action.payload);
      const step =
        typeof action.payload === "number"
          ? action.payload
          : normalizeSteps(action.payload);

      if (!state.completedSteps.includes(step)) {
        state.completedSteps.push(step);
      }
    },

    resetStepsAfter: (state, action: PayloadAction<string | number>) => {
      const stepIndex =
        typeof action.payload === "number"
          ? action.payload
          : normalizeSteps(action.payload);

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
