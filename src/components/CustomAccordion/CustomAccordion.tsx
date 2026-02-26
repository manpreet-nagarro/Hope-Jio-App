import { AccordionDetails, AccordionSummary, Box } from "@mui/material";
import { AccordionSummaryTitle, StyledAccordion } from "./CustomAccordion.styles";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const CustomAccordion = ({ children, label }: { children: React.ReactNode, label: string}) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <StyledAccordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        sx={{background: "transparent", padding: 0, minHeight: "max-content !important"}}
        expandIcon={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#000093",
              
            }}
          >
            {expanded ? <RemoveIcon /> : <AddIcon />}
          </Box>
        }
      >
        <AccordionSummaryTitle>{label}</AccordionSummaryTitle>
      </AccordionSummary>
      <AccordionDetails sx={{padding: 0}}>
        {children}
      </AccordionDetails>
    </StyledAccordion>
  );
};
