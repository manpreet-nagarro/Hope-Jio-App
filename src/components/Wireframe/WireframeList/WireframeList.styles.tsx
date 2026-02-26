import styled from "styled-components";
import { styled as MuiStyled} from "@mui/material/styles"
import {TableCell, TableHead} from "@mui/material";
import { COLORS, FONTS } from "@constants/theme.constants";

export const HeaderCell = MuiStyled(TableCell)(() => ({
  padding: '12px 0px',
  fontSize: '1rem',
  fontFamily: FONTS.FONT_FAMILY_BOLD,
  lineHeight: '20px',
  color: COLORS.TEXT_DARK,
  textAlign: 'left',
}));

export const StyledTableCell = MuiStyled(TableCell)(() => ({
  padding: '8px 0px',
  fontSize: '1rem',
  fontFamily: FONTS.FONT_FAMILY,
  lineHeight: '24px',
  color: COLORS.TEXT_DARK,
}));

export const TextCell = MuiStyled("div")(() => ({
  paddingTop: '16px 0px',
  fontSize: '1rem',
  fontFamily: FONTS.FONT_FAMILY,
  lineHeight: '24px',
  color: COLORS.TEXT_DARK,
}));

export const UrlTableCell = MuiStyled(TableCell)(() => ({
   paddingTop: '16px 0px',
  fontSize: '16px',
  fontFamily: FONTS.FONT_FAMILY,
  lineHeight: '24px',
  color: COLORS.ACCENT_SECONDARY,
}));

export const StyledTableHead = MuiStyled(TableHead)(() => ({
  backgroundColor: 'rgba(231, 235, 248, 0.749)',
  height: '57px',
}));

export const TableContainerStyled = MuiStyled('div')(() => ({
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  border: '1px solid #E0E0E0',
  boxShadow: '0px 4px 22px rgba(0, 0, 0, 0.15)',
  position: 'relative',
}));

export const StatusChip = styled.span<{
  $bg: string;
  $color: string;
}>`
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  font-family: ${FONTS.FONT_FAMILY_BOLD};
  line-height: 24px;
  background-color: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  display: inline-block;
  width: max-content;
`;

export const PageContainer = styled.div`
  padding: 16px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
`;

export const TableWrapper = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
`;

export const PlatformCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .table-platform-icon {
    color: #9eb5fa;
  }

  span {
    font-size: 14px;
    color: #141414;
  }
`;

export const PageNameCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PageTitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  width: fit-content;
  font-family: ${FONTS.FONT_FAMILY};

  &:hover ${'' /* text */} span,
  &:focus-visible ${'' /* text */} span {
    color: #3535F3;
  }

  &:hover ${'' /* arrow */} .page-title-arrow,
  &:focus-visible ${'' /* arrow */} .page-title-arrow {
    opacity: 1;
    visibility: visible;
  }
`;

export const PageTitleText = styled.span`
  font-size: 1rem;
  font-family: ${FONTS.FONT_FAMILY};
  color: ${COLORS.TEXT_DARK};
  text-transform: capitalize;
`;

export const PageTitleArrow = styled.span`
  opacity: 0;
  transition: opacity 0.2s ease;
  color: #3535F3;
  visibility: visible;
  display:flex;
`;

export const PageMeta = styled.div`
  font-size: 12px;
  color: #7B7B7B;
  font-family: ${FONTS.FONT_FAMILY_LIGHT};
  line-height: 18px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const PaginationActions = styled.div`
  display: flex;
  gap: 8px;

  button {
    border-radius: 1000px;
    gap: 8px;
    height: 32px;
    color: #000093;
    border: 1px solid #E0E0E0;
    padding: 4px 1rem;

    & .MuiButton-icon{
      margin: 0
    }
  }
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;

  .pagination {
    height:32px;
    border-radius: 4px;
  }
`;

export const PageInfo = styled.div`
  font-size: 1rem;
  color: ${COLORS.TEXT_SECONDARY};
  font-family: ${FONTS.FONT_FAMILY};
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const RowsSpan = styled.span`
  font-family: ${FONTS.FONT_FAMILY};
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;




