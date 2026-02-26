import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import UrlMappingRow from "./UrlMappingRow";

import {
  SectionWrapper,
  SectionHeader,
  HeaderLeft,
  SectionBody,
} from "./UrlMappingSection.styles";
import { Box } from "@mui/material";
import type { IUrlMapping } from "src/interfaces/Wireframes";

interface Props {
  title: string;
  statusLabel: string;
  status?: string;
  data: IUrlMapping[];
  defaultOpen?: boolean;
}

const UrlMappingSection = ({
  title,
  statusLabel,
  status = "inactive",
  data,
  defaultOpen = false,
}: Props) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SectionWrapper sx={{ background: open ? "rgba(251, 251, 254, 1)" : "transparent" }}>
      <SectionHeader>
        <HeaderLeft>
          <Box
            sx={{
              fontSize: 16,
              lineHeight: "20px",
              letterSpacing: "-0.5px",
              color: "#141414",
              fontWeight: 500,
            }}
          >
            {title}
          </Box>
          <Chip
            label={statusLabel}
            sx={{
              fontSize: 12,
              fontWeight: 700,
              lineHeight: "16px",
              letterSpacing: "-0.5px",
              borderRadius: "4px",
              background: status === "active" ? "#E5F7EE" : "#F5F5F5",
              color: status === "active" ? "#03753C" : "#595959",
            }}
          />
        </HeaderLeft>

        <IconButton size="small" sx={{ color: "#000093" }} onClick={() => setOpen((p) => !p)}>
          {open ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </SectionHeader>

      <Collapse in={open} unmountOnExit>
        <SectionBody>
          {data?.map((item) => (
            <UrlMappingRow data={item} key={item.wireframeId} />
          ))}
        </SectionBody>
      </Collapse>
    </SectionWrapper>
  );
};

export default UrlMappingSection;
