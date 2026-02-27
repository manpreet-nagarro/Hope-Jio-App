import React from "react";
import { Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "@store/store";

import TaskBrief from "../steps/TaskBrief/TaskBrief";

import HotspotsProperties from "../steps/HotspotsProperties/HotspotsProperties";
import ReviewSubmit from "../steps/ReviewSubmit/ReviewSubmit";
import TemplatePreview from "../steps/TemplatePreview/TemplatePreview";

export default function WizardCanvas() {
  const activeStep = useSelector(
    (state: RootState) => state.stepper.activeStep,
  );

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <TaskBrief />;
      case 1:
        return <TemplatePreview />;
      case 2:
        return <HotspotsProperties />;
      case 3:
        return <ReviewSubmit />;
      default:
        return null;
    }
  };

  return (
    <Box p={0}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        {renderStep()}
      </Paper>
    </Box>
  );
}
