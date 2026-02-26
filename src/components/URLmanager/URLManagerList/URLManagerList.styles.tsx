import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";
import { TableCell, TableHead } from "@mui/material";
import { COLORS, FONTS } from "@constants/theme.constants";

export const HeaderCell = MuiStyled(TableCell)(() => ({
  padding: "12px 0px",
  fontSize: "1rem",
  fontFamily: FONTS.FONT_FAMILY_BOLD,
  lineHeight: "20px",
  color: COLORS.TEXT_DARK,
  textAlign: "left",
}));

export const StyledTableCell = MuiStyled(TableCell)(() => ({
  paddingTop: "8px 0px",
  fontSize: "1rem",
  fontFamily: FONTS.FONT_FAMILY,
  lineHeight: "24px",
  color: COLORS.TEXT_DARK,
}));

export const StyledSlugTableCell = MuiStyled(TableCell)(() => ({
  padding: "8px 0px",
  fontSize: "1rem",
  fontFamily: FONTS.FONT_FAMILY,
  lineHeight: "24px",
  color: "#1565c0",
  cursor: "pointer",
  ".styled__link" :{
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none ",
    }
  }
}));

export const TextCell = MuiStyled("div")(() => ({
  padding: "8px 0px",
  fontSize: "1rem",
  fontFamily: FONTS.FONT_FAMILY,
  lineHeight: "24px",
  color: COLORS.TEXT_DARK,
}));

export const StyledScheduled = styled.div`
  fontsize: 16px;
  fontweight: 500;
  color: #388e3c;
  font-family: ${FONTS.FONT_FAMILY};
  line-height: 24px;
`;

export const StyledExpired = styled.div`
  fontsize: 16px;
  fontweight: 500;
  color: #d32f2f;
  font-family: ${FONTS.FONT_FAMILY};
  line-height: 24px;
`;

export const StyledDate = styled.div`
  fontsize: 12px;
  color: #7b7b7b;
  font-weight: 300;
  font-family: ${FONTS.FONT_FAMILY};
  line-height: 18px;
  style: ${FONTS.FONT_FAMILY_LIGHT};
`;

export const ScheduleDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTableHead = MuiStyled(TableHead)(() => ({
  backgroundColor: "rgba(231, 235, 248, 0.749)",
  height: "57px",
}));

export const TableContainerStyled = MuiStyled("div")(() => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  border: "1px solid #E0E0E0",
  boxShadow: "0px 4px 22px rgba(0, 0, 0, 0.15)",
  position: "relative",
}));

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
  padding: 0px !important;

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
  width: fit-content;
`;

export const PageTitleText = styled.span`
  font-size: 1rem;
  font-family: ${FONTS.FONT_FAMILY};
  color: ${COLORS.TEXT_DARK};
  text-transform: capitalize;
`;

export const PageMeta = styled.div`
  font-size: 12px;
  color: #7b7b7b;
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
    border: 1px solid #e0e0e0;
    padding: 4px 1rem;

    & .MuiButton-icon {
      margin: 0;
    }
  }
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;

  .pagination {
    height: 32px;
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
