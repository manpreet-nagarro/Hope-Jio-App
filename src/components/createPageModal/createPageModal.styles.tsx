import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";
import { Box, Card, Chip, TextField, Typography } from "@mui/material";
import { COLORS, FONTS } from "@constants/theme.constants";

export const SvgNormalize = styled("div")`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;

  svg {
    width: 20px;
    height: 20px;
    display: block; 
    overflow: visible;
  }
`;


/* ---------- Header ---------- */

export const Header = MuiStyled(Box)`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  height: 45px;
`;

export const Title = MuiStyled("h2")`
  margin: 0;
  font-size: 18px;
  font-family: ${FONTS.FONT_FAMILY_BOLD};
  color: #000000;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6b7280;
`;

/* ---------- Content ---------- */

export const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.div`
  font-size: 1rem;
  font-family: ${FONTS.FONT_FAMILY};
  color: ${COLORS.TEXT_BLACK};
  margin-bottom: 16px;
`;

/* ---------- Labels & Inputs ---------- */

export const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-family: ${FONTS.FONT_FAMILY};
  color: ${COLORS.TEXT_DARK_LIGHT};
`;

export const Required = styled.span`
  color: #ef4444;
  margin-left: 2px;
`;

export const StyledTextField = MuiStyled(TextField)(() => ({
  width: "100%",
  "& .MuiInputBase-root": {
    fontSize: "14px",
    color: "#111827",
    gap: "8px",
    marginBottom: "0.25rem",

    "&:focus-within": {
      outline: "none",
      borderColor: "#000093",
    },

    "&:hover": {
      outline: "none",
      borderColor: "#000093",
    },
  },
}));

/* ---------- Slug ---------- */

export const SlugWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SlugPrefix = styled.div`
  padding: 10px 12px;
  font-size: 14px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-right: none;
  border-radius: 6px 0 0 6px;
  color: #374151;
`;

export const SlugHelperText = styled.div`
  font-size: 0.875rem;
  color: ${COLORS.TEXT_DARK_LIGHT};
  font-family: ${FONTS.FONT_FAMILY};
`;

/* ---------- Platform ---------- */

export const PlatformGrid = MuiStyled(Box)`
  display: flex;
  gap: 12px;
`;

export const StyledPlatformCard = MuiStyled(Card)<{ active: boolean, readonly?: boolean }>`
  flex: 1;
  padding: 0;
  border-radius: 8px;
  border: 1px solid ${({ active }) => (active ? "#000093" : "#E0E0E0")};
  background: ${({ active }) => (active ? "#E8E8FC" : "#ffffff")};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${({ readonly }) => (readonly ? "default" : "pointer")};
  transition: border-color 0.2s ease;
  color: ${({ active }) => (active ? "#000093" : "#000000")};
  box-shadow: ${({ active }) => (active ? "0px 4px 12px rgba(0,0,0,12)" : "0px 1px 4px rgba(0,0,0,08)")}
  overflow: visible; 

  &:hover {
    ${({ readonly }) =>
      readonly ? `
       border-color: #000093;
       background: #ffffff;
    ` : `
      border-color: #000093;
      background: #E8E8FC;
    `}
  }

  .platform-icon svg {
    height: 32px;
    width: 32px;
    fill: currentColor;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledPlatformTitle = MuiStyled(Typography)`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  font-family: ${FONTS.FONT_FAMILY_BOLD};
  font-size: 1rem;
`

/* ---------- Store ---------- */

export const StoreGrid = MuiStyled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const StoreChip = MuiStyled(Chip)<{ active: boolean, readonly?: boolean }>`
  font: ${FONTS.FONT_FAMILY};
  padding: 6px 14px;
  border-radius: 1000px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  border: 1px solid ${({ active }) => (active ? "#000093" : "#E0E0E0")};
  background: ${({ active }) => (active ? "#E8E8FC" : "#ffffff")};
  color: ${({ active }) => (active ? "#000093" : "#000000")};
  cursor: ${({ readonly }) => (readonly ? "default" : "pointer")};
  transition: all 0.2s ease;
  gap: 8px;

  &:hover {
    ${({ readonly }) =>
      readonly ? `
       border-color: #E0E0E0;
       background: #ffffff;
    ` : `
      border-color: #000093;
      background: #E8E8FC;
    `}
  }
`;

/* ---------- Action Type ---------- */

export const ActionGrid = MuiStyled(Box)`
  display: flex;
  gap: 12px;
`;

export const StyledActionCard = MuiStyled(Card)<{ active: boolean }>`
  flex: 1;
  border-radius: 10px;
  border: 1px solid ${({ active }) => (active ? "#000093" : "#E0E0E0")};
  background: ${({ active }) => (active ? "#E8E8FC" : "#ffffff")};
  color:  ${({ active }) => (active ? "#000093" : "#ffffff")};
  box-shadow: ${({ active }) => (active ? "0px 4px 12px rgba(0,0,0,12)" : "0px 1px 4px rgba(0,0,0,08)")}
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  overflow: visible;
`;

export const CardContentCenter = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;


export const ActionIcon = styled.div`
  height: 2rem;

  svg {
    width: 24px;
    height: 24px;
    display: block;
  }
`;

export const ActionTitle = styled.div<{ active: boolean }>`
  font-size: 1rem;
  font-family: ${FONTS.FONT_FAMILY};
  color:  ${({ active }) => (active ? "#000093" : "#141414")};
`;

export const ActionSubtitle = styled.div<{ active: boolean }>`
  font-size: 12px;
  color:  ${({ active }) => (active ? "#000093" : "#595959")};
`;

/* ---------- Errors ---------- */

export const ErrorText = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #ef4444;
`;

/* ---------- Footer ---------- */

export const Footer = styled.div`
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e5e7eb;
  height: 72px;
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  border-radius: 1000px;
  background: #ffffff;
  border: 1px solid #E0E0E0;
  cursor: pointer;
`;

export const CreateButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  border-radius: 1000px;
  background: #3535F3;
  color: #ffffff;
  border: none;
  cursor: pointer;
  gap: 6px;

  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;
