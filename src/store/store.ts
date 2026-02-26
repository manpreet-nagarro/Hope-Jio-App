import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import wireframeReducer from "./wireframeSlice/wireframeSlice";
import navigationReducer from "./navigatonSlice/navigationSlice";
import toastReducer from "./toastSlice/toastSlice";
import uiReducer from "./UISlice/UISlice";
import slotsReducer from "./slotsSlice/slotsSlice";
import privilegesReducer from "./privilegesSlice/privilegesSlice";
import cohortConfigreducer from "./cohortConfigSlice/cohortConfigSlice";
import scAssignmentStatusFlowReducer from "./assign/scAssignmentStatusFlowSlice";
import stepperReducer from "./creativeSlice/creativeSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
    wireframe: wireframeReducer,
    navigation: navigationReducer,
    toast: toastReducer,
    ui: uiReducer,
    slots: slotsReducer,
    privileges: privilegesReducer,
    cohortConfig: cohortConfigreducer,
    scAssignmentStatusFlow: scAssignmentStatusFlowReducer,
    stepper: stepperReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
