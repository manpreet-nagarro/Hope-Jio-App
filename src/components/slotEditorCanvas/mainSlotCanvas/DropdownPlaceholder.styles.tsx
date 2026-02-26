import styled from "styled-components";
import { COLORS, FONTS } from "@constants/theme.constants";

export const DropdownPlaceholderWrapper = styled.div`
  margin-top: 15px !important;
  margin-bottom: 16px !important;
  width: calc(100% - 2rem);
  margin-left: 2rem;
  margin-right: 2rem;
`;
export const DropdownPlaceholderItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 35px;
  padding: 8px 0;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;

export const DropdownLabel = styled.div`
  font-size: 14px;
  font-family: ${FONTS.FONT_FAMILY};
  color: ${COLORS.TEXT_SECONDARY};
  margin-right: 7px;
`;
export const DropdownItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArrowIconWrapper = styled.div`
  rotate: 90deg;
`
