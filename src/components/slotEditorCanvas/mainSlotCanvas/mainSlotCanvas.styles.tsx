import { HEADER_HEGHT, WIREFRAME_EDIOTR_CANVAS_HEADER_HEIGHT } from "@constants/commonConstants";
import { Box } from "@mui/material";
import styled from "styled-components";

export const DottedBackground = styled(Box)(() => ({
  width: "100%",
  // allow the container to size to its parent instead of forcing viewport height
  minHeight: "100%",
  position: "relative",
  // avoid showing a scrollbar unless content truly overflows
  overflowY: "visible",
  backgroundSize: "20px 20px",
}));

export const DottedBackgroundOuter = styled(Box)(() => ({
  width: "100%",
  // allow the container to size to its parent instead of forcing viewport height
  minHeight: "100%",
  position: "relative",
  // prevent outer horizontal scrollbar when inner content is transformed
  overflowX: "hidden",
  overflowY: "visible",
  backgroundImage: `
    radial-gradient(
      circle,
      #B5B5B5 1px,
      transparent 1px
    )
  `,
  backgroundSize: "20px 20px",
  maxHeight: `calc(100vh - ${HEADER_HEGHT + WIREFRAME_EDIOTR_CANVAS_HEADER_HEIGHT}px)`,
}));
