import styled from "styled-components";

export const CanvasWrapper = styled.div<{ isReadOnly?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: #ededed;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  cursor: ${({ isReadOnly }) => (isReadOnly ? "default" : "crosshair")};
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  pointer-events: none;
`;

export const OverlayLayer = styled.div<{ enableDrawing?: boolean }>`
  position: absolute;
  inset: 0;
  cursor: ${({ enableDrawing }) => (enableDrawing ? "crosshair" : "default")};
`;

export const HotspotBox = styled.div<{ isReadOnly?: boolean }>`
  position: absolute;
  border: 2px solid #3b82f6;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 4px;
  box-sizing: border-box;

  cursor: ${({ isReadOnly }) => (isReadOnly ? "default" : "move")};

  ${({ isReadOnly }) =>
    isReadOnly &&
    `
      pointer-events: none;
      opacity: 0.9;
  `}
`;
