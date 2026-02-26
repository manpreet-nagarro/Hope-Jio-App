import { Box } from "@mui/material";
import { SystemMetadataAccordion } from "./SystemMetadataAccordion";
import PageDetailsAccordion from "./PageDetailsAccordion";
import { AssignmentAndStatusAccordion } from "./AssignmentAndStatus";

export const GeneralInformation = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
      <PageDetailsAccordion />
      <AssignmentAndStatusAccordion />
      <SystemMetadataAccordion />
    </Box>
  );
};
