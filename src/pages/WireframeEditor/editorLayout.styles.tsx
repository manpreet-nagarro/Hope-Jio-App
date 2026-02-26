import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const EditorLayoutContainer = styled(Box, {
  shouldForwardProp: (prop) =>  prop !== "globalSidebarWidth" && prop !== "componentLibraryWidth",
})<{
  globalSidebarWidth: number;
  componentLibraryWidth: number;
}>(({ globalSidebarWidth, componentLibraryWidth }) => ({
  display: "grid",
  height: "max-content",

  gridTemplateRows: "92px 80px 1fr",

  gridTemplateColumns: `
    ${globalSidebarWidth}px
    ${componentLibraryWidth}px
    1fr
  `,

  background: "transparent",
}));

export const GlobalSidebarSlot = styled(Box)(() => ({
  gridColumn: "1 / 2",
  gridRow: "1 / 4", // spans full height
}));

export const ComponentLibrarySlot = styled(Box)(() => ({
  gridColumn: "2 / 3",
  gridRow: "1 / 4",
  background: "transparent",
  borderRight: "1px solid #E0E0E0",
}));

export const GlobalHeaderSlot = styled(Box)(() => ({
  gridColumn: "3 / 4",
  gridRow: "1 / 2",
  zIndex: 1,
  background: "#EEF1FF",
    borderBottom: "1px solid #E6E8EC",
}));

export const EditorHeaderSlot = styled(Box)(() => ({
  gridColumn: "3 / 4",
  gridRow: "2 / 3",
  background: "#FFFFFF",
          borderBottom: "1px solid #E6E8EC",
          zIndex: 1,
}));

export const EditorCanvasSlot = styled(Box)(() => ({
  gridColumn: "3 / 4",
  gridRow: "3 / 4",
  overflow: "auto",
  minHeight: "max-content"
}));
