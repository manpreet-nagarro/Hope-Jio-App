import { useState } from "react";
import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { StyledAccordion } from "../PageInfoTabs.styles";
import AddCircle from "@assets/icons-svg/addCircle";
import ProfileIcon from "@assets/icons-svg/profileIcon";
import CalendarIcon from "@assets/icons-svg/calendarIcon";
import EditIcon from "@assets/icons-svg/editIcon";
import { useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { formatLastUpdated } from "@utils/formatDate";

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
      width: { xs: "100%", md: "50%" }, // 2 columns on desktop
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

export const SystemMetadataAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const pageConfigWireframe = useSelector(
    (state: RootState) => state.wireframe.pageConfigWireframe,
  );

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
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "20px",
            color: "#141414",
          }}
        >
          System Metadata
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2, pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: 4,
            columnGap: 0,
          }}
        >
          <MetaItem
            icon={<AddCircle />}
            label="Created By"
            value={pageConfigWireframe?.createdBy || ""}
          />

          <MetaItem
            icon={<CalendarIcon />}
            label="Created On"
            value={formatLastUpdated(pageConfigWireframe?.createdAt)}
          />

          <MetaItem
            icon={<ProfileIcon />}
            label="Last Updated By"
            value={pageConfigWireframe?.modifiedBy || "NA"}
          />

          <MetaItem
            icon={<EditIcon />}
            label="Last Updated On"
            value={formatLastUpdated(pageConfigWireframe?.modifiedAt)}
          />
        </Box>
      </AccordionDetails>
    </StyledAccordion>
  );
};
