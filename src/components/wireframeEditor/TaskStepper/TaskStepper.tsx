import { Stepper, Step, Box } from "@mui/material";
import { StyledConnector, StyledStepLabel } from "./TaskStepper.styles";

const steps = [
  "Task Brief",
  "Template Preview",
  "Hotspots & Properties",
  "Review & Submit",
];

interface Props {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export default function TaskStepper({ activeStep, setActiveStep }: Props) {
  const handleStepClick = (index: number) => {
    if (index <= activeStep) {
      setActiveStep(index);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<StyledConnector />}
        aria-label="Task progress"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StyledStepLabel
              onClick={() => handleStepClick(index)}
              sx={{
                cursor: index <= activeStep ? "pointer" : "not-allowed",
              }}
            >
              {label}
            </StyledStepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
