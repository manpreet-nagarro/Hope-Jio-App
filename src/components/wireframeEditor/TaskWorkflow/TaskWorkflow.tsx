import React, { useState, createContext, useContext } from "react";
import { Box } from "@mui/material";
import TaskStepper from "../TaskStepper/TaskStepper";

type TaskWorkflowContextType = {
  activeStep: number;
  setActiveStep: (n: number) => void;
};

const TaskWorkflowContext = createContext<TaskWorkflowContextType | undefined>(
  undefined,
);

export const TaskWorkflowProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <TaskWorkflowContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </TaskWorkflowContext.Provider>
  );
};

export const useTaskWorkflow = () => {
  const ctx = useContext(TaskWorkflowContext);
  if (!ctx)
    throw new Error("useTaskWorkflow must be used within TaskWorkflowProvider");
  return ctx;
};

// Non-throwing optional hook for components that may be used outside the provider
export const useOptionalTaskWorkflow = () => {
  return useContext(TaskWorkflowContext);
};

// Header-only TaskWorkflow: renders only the Stepper and uses shared context state
export default function TaskWorkflow() {
  const { activeStep, setActiveStep } = useTaskWorkflow();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0, p: 0 }}>
      <Box sx={{ flexShrink: 0 }}>
        <TaskStepper activeStep={activeStep} setActiveStep={setActiveStep} />
      </Box>
    </Box>
  );
}
