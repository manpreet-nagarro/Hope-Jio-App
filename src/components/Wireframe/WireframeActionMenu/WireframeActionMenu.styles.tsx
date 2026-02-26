import styled from "styled-components";
import { styled as MuiStyled} from "@mui/material/styles";
import { Divider, ListItemText } from "@mui/material";
import { COLORS, FONTS } from "@constants/theme.constants";

export const StyledListText = MuiStyled(ListItemText)(() => ({
  margin: 0,

  "& .MuiListItemText-primary": {
    fontSize : "0.875rem",
    fontFamily: FONTS.FONT_FAMILY,
    lineHeight: "19.5px",
    letterSpacing: "-0.08px",
    color: COLORS.TEXT_PRIMARY,
  },

  /* Delete */
  "&.delete .MuiListItemText-primary": {
    color: "#f50031",
  },
}));


export const SvgNormalize = styled("div")`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  margin-bottom: 3px;

  svg {
    width: 16px;
    height: 16px;
    display: block; 
    overflow: visible;
    transform: translateY(1px);
  }
`;

export const ActionIcon = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

export const StyledDivider = MuiStyled(Divider)`
    color: #EBEBEB
`;

export const SpanClick = styled.span`
    cursor: pointer;
`;