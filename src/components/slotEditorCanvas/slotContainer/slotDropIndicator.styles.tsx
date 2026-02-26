import { COLORS } from "@constants/theme.constants";
import styled from "styled-components";

export const SlotDropIndicator = styled.div`
  height: 3px;
  background: ${COLORS.ACCENT_PRIMARY};
  border-radius: 2px;
  margin: 0px 0 5px 0;
  transition: background 0.2s;
  opacity: 0.7
`;
