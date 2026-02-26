import { useState } from "react";
import {
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { StyledAccordion } from "../PageInfoTabs.styles";
import { useSelector } from "react-redux";
import type { RootState } from "@store/store";

const AccordionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "20px",
      letterSpacing: "-0.5%",
      color: "#141414",
    }}
  >
    {children}
  </Typography>
);

const ComponentDetailsAccordion = () => {
  const [expanded, setExpanded] = useState(true);
  const { activeComponentIndex, activeSlotIndex } = useSelector(
    (state: RootState) => state.slots,
  );

  return (
    <StyledAccordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
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
        <AccordionTitle>Component Details</AccordionTitle>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={2}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#141414",
            }}
          >
            Component ({(activeSlotIndex || 0) + 1}/
            {(activeComponentIndex || 0) + 1})
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "rgba(0,0,0,0.45)",
              lineHeight: "16px",
            }}
          >
            Component Type
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "rgba(0,0,0,0.45)",
              lineHeight: "16px",
            }}
          >
            Dynamic Banner
          </Typography>
        </Stack>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default ComponentDetailsAccordion;
