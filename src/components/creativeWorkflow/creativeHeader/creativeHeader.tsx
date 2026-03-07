import { Step, StepLabel } from "@mui/material";
import {
  CloseButton,
  CloseLabel,
  SaveButton,
  StyledStepper,
  StyledAppBar,
  StyledToolbar,
  HeaderRow,
  CompletedIconWrapper,
} from "./creativeHeader.styles";

import { useDispatch, useSelector } from "react-redux";
import { setStep } from "@store/creativeSlice/creativeSlice";
import type { RootState } from "@store/store";

import CloseEditorIcon from "@assets/icons-svg/wireframeEditor/close-editor.svg";
import { CLOSE_WIZARD, SAVE_EDITOR } from "@utils/messages";

import DoneIcon from "@mui/icons-material/Done";
import CompletedStepIcon from "@assets/icons-svg/completedStepIcon";

const steps = [
  "Task Brief",
  "Template Preview",
  "Hotspots & Properties",
  "Review & Submit",
];

export default function WizardHeader() {
  const dispatch = useDispatch();

  const activeStep = useSelector(
    (state: RootState) => state.stepper.activeStep,
  );

  const visitedSteps = useSelector(
    (state: RootState) => state.stepper.visitedSteps,
  );

  const completedSteps = useSelector(
    (state: RootState) => state.stepper.completedSteps,
  );

  const handleStepClick = (index: number) => {
    if (visitedSteps.includes(index)) {
      dispatch(setStep(index));
    }
  };

  return (
    <StyledAppBar position="static" color="transparent" elevation={1}>
      <StyledToolbar>
        <HeaderRow>
          <CloseButton variant="text">
            <img
              src={CloseEditorIcon}
              alt="close-editor"
              width={18}
              height={18}
            />
            <CloseLabel>{CLOSE_WIZARD}</CloseLabel>
          </CloseButton>

          <StyledStepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const isActive = index === activeStep;
              const isCompleted = completedSteps.includes(index) && !isActive;

              return (
                <Step key={label} onClick={() => handleStepClick(index)}>
                  <StepLabel
                    icon={
                      isCompleted ? (
                        <CompletedIconWrapper>
                          <CompletedStepIcon
                            style={{ width: 16, height: 16 }}
                          />
                        </CompletedIconWrapper>
                      ) : undefined
                    }
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </StyledStepper>

          <SaveButton variant="outlined" startIcon={<DoneIcon />} disabled>
            {SAVE_EDITOR}
          </SaveButton>
        </HeaderRow>
      </StyledToolbar>
    </StyledAppBar>
  );
}
