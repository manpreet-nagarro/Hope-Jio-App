import { useState } from "react";
import { AccordionSummary, AccordionDetails, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  BadgeStatus,
  BadgeText,
  StatusContainer,
  StatusText,
  StyledAccordion,
} from "../PageInfoTabs.styles";
import SendForReviewIcon from "@assets/icons-svg/AssignIcon";
import Department from "@assets/icons-svg/department";

type MetaItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const MetaItem = ({ icon, label, value }: MetaItemProps) => (
  <Box
    sx={{
      display: "flex",
      gap: 2,
      alignItems: "flex-start",
      width: "100%",
    }}
  >
    <Box sx={{ color: "#141414", mt: "2px" }}>{icon}</Box>

    <Box>
      <Box
        sx={{
          fontSize: "12px",
          fontWeight: "500",
          lineHeight: "100%",
          letterSpacing: "0.06px",
          color: "#595959",
          display: "block",
          mb: "2px",
        }}
      >
        {label}
      </Box>

      <Box
        sx={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "19.5px",
          letterSpacing: "-0.08px",
          color: "#141414",
        }}
      >
        {value}
      </Box>
    </Box>
  </Box>
);

export const AssignmentAndStatusAccordion = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <StyledAccordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
    >
      <AccordionSummary
        sx={{ px: 2 }}
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
        <Box
          sx={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: "20px",
            color: "#141414",
            whiteSpace: "nowrap",
          }}
        >
          Assignments & Status
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2, pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <MetaItem
            icon={<Department />}
            label="Department"
            value="Central Planning"
          />

          <MetaItem
            icon={<SendForReviewIcon />}
            label="Pool"
            value="CP Checker"
          />

          <StatusContainer>
            <StatusText>Status</StatusText>

            <BadgeStatus>
              <BadgeText>Pg. In Review</BadgeText>
            </BadgeStatus>
          </StatusContainer>
        </Box>
      </AccordionDetails>
    </StyledAccordion>
  );
};
