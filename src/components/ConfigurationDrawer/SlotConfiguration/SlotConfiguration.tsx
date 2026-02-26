import { Box } from "@mui/material";
import { SystemMetadataAccordion } from "./SystemMetadataAccordion";
import { AssignmentAndStatusAccordion } from "./AssignmentAndStatus";
import SlotDetailsAccordion from "./SlotDetailsAccordion";
import SlotScheduler from "./SlotScheduler";

export const SlotConfiguration = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
      <SlotDetailsAccordion />
      <AssignmentAndStatusAccordion />
      <SlotScheduler />
      <SystemMetadataAccordion />
    </Box>
  );
};
