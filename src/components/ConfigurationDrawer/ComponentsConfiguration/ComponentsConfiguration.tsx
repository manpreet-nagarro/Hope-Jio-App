import { useSelector } from "react-redux";
import type { RootState } from "@store/store";
import TuneIcon from "@assets/icons-svg/tuneIcon";
import { Box, Typography } from "@mui/material";
import ComponentDetailsAccordion from "./ComponentDetailsAccordion";
import { AssignmentAndStatusAccordion } from "../SlotConfiguration/AssignmentAndStatus";
import ComponentScheduler from "./ComponentScheduler";
import RouteSettingsAccordion from "./RouteSettingsAccordion";
import ABTestTagsAccordion from "./ABTestTagsAccordion";
import UserCohortAccordion from "./UserCohortAccordion";

export const ComponentsConfiguration = () => {
  const { activeComponentIndex, activeSlotIndex } = useSelector(
    (state: RootState) => state.slots,
  );

  const showComponent =
    activeSlotIndex !== null && activeComponentIndex !== null;

  if (!showComponent) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#E8E8FC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TuneIcon />
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            No component selected
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", maxWidth: 240 }}
          >
            Select a component inside a slot to view and edit its properties.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <ComponentDetailsAccordion />
      <UserCohortAccordion />
      <AssignmentAndStatusAccordion />
      <ComponentScheduler />
      <ABTestTagsAccordion />
      <RouteSettingsAccordion />
    </Box>
  );
};
