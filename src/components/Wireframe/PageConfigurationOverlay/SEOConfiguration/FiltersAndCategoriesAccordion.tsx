import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AccordionDetails, AccordionSummary, Box, Stack } from "@mui/material";
import { useState } from "react";
import { AccordionTitle, StyledAccordion } from "../PageInfoTabs.styles";
import { UploadRow } from "./UploadRow";

export const FiltersAndCategoriesAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledAccordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary
        expandIcon={
          <Box sx={{ color: "#000093" }}>
            {expanded ? <RemoveIcon /> : <AddIcon />}
          </Box>
        }
      >
        <AccordionTitle>Filters & Categories</AccordionTitle>
      </AccordionSummary>

      <AccordionDetails sx={{ padding: 0 }}>
        <Stack spacing={0}>
          <UploadRow title="Top Brands" />
          <UploadRow title="Top Searches" />
          <UploadRow title="Top Categories" />
        </Stack>
      </AccordionDetails>
    </StyledAccordion>
  );
};
