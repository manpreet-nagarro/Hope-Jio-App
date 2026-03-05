// ...existing code...
import { AppBar, Toolbar, Stepper, Step, StepLabel, Box } from "@mui/material";
import { CloseButton, CloseLabel, SaveButton } from "./creativeHeader.styles";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "@store/creativeSlice/creativeSlice";
import type { RootState } from "@store/store";
import CloseEditorIcon from "@assets/icons-svg/wireframeEditor/close-editor.svg";
import { CLOSE_WIZARD, SAVE_EDITOR } from "@utils/messages";
import DoneIcon from "@mui/icons-material/Done";
import CompletedStepIcon from "@assets/icons-svg/completedStepIcon";
import { FONTS } from "@constants/theme.constants";
// ...existing code...

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
    // Allow navigation to visited steps only
    if (visitedSteps.includes(index)) {
      dispatch(setStep(index));
    }
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={1}
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        flexShrink: 0,
        height: "96px",
        padding: "0 24px",
      }}
    >
      <Toolbar sx={{ flexDirection: "column", alignItems: "stretch" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <CloseButton variant="text">
            <img
              src={CloseEditorIcon}
              alt="close-editor"
              width={18}
              height={18}
            />
            <CloseLabel>{CLOSE_WIZARD}</CloseLabel>
          </CloseButton>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              mt: 2,
              width: "100%",

              /* DEFAULT circle */
              "& .MuiStepIcon-root": {
                color: "#fff",
                border: "1px solid #B5B5B5",
                borderRadius: "50%",
                width: 32,
                height: 32,
              },

              /* DEFAULT number */
              "& .MuiStepIcon-text": {
                fill: "#B5B5B5",
                fontWeight: 700,
              },

              /* ACTIVE circle */
              "& .MuiStepIcon-root.Mui-active": {
                color: "#3535F3",
                border: "1px solid #3535F3",
              },

              /* ✅ ACTIVE number → WHITE */
              "& .MuiStepIcon-root.Mui-active .MuiStepIcon-text": {
                fill: "#ffffff",
              },

              /* LABEL default */
              "& .MuiStepLabel-label": {
                color: "#000",
                fontFamily: FONTS.FONT_FAMILY,
              },

              /* ACTIVE label */
              "& .MuiStepLabel-label.Mui-active": {
                fontWeight: 600,
              },
            }}
          >
            {steps.map((label, index) => {
              const isActive = index === activeStep;
              const isCompleted = completedSteps.includes(index) && !isActive;
              return (
                <Step key={label} onClick={() => handleStepClick(index)}>
                  <StepLabel
                    icon={
                      isCompleted ? (
                        <Box
                          sx={{
                            border: "2px solid #1ECCB0",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 32,
                            height: 32,
                            boxSizing: "border-box",
                            background: "#E8FAF7",
                          }}
                        >
                          <CompletedStepIcon
                            style={{ width: 16, height: 16 }}
                          />
                        </Box>
                      ) : undefined
                    }
                    sx={{
                      cursor: "pointer",
                      "& .MuiStepIcon-root": isCompleted
                        ? {
                            stroke: "#1ECCB0",
                            strokeWidth: "1px",
                          }
                        : {},
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <SaveButton variant="outlined" startIcon={<DoneIcon />} disabled>
            {SAVE_EDITOR}
          </SaveButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
