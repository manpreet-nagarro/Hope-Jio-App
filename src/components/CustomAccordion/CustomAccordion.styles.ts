import { COLORS, FONTS } from "@constants/theme.constants";
import { Accordion } from "@mui/material";
import styled from "styled-components";

export const StyledAccordion = styled(Accordion)(() => ({
  backgroundColor: "transparent !important",
  boxShadow: "none !important",
  padding: "0 0.5rem",

  "&.Mui-expanded": {
    backgroundColor: "#FBFBFE !important",
    margin: 0,
    borderRadius: "10px !important",
  },

  "&::before": {
    display: "none", // remove default divider
  },
}));

export const AccordionSummaryTitle = styled("span")(() => ({
  fontSize: "1rem",
  fontFamily: FONTS.FONT_FAMILY,
  color: COLORS.TEXT_DARK
}));