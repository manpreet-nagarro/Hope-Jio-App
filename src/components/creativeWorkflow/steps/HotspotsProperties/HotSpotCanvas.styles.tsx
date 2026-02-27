import styled from "styled-components";

export const CanvasWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  background: #ededed;

  user-select: none; /* ✅ Prevent text selection */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;
export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

export const OverlayLayer = styled.div<{ enableDrawing?: boolean }>`
  position: absolute;
  inset: 0;
  cursor: ${({ enableDrawing }) => (enableDrawing ? "crosshair" : "default")};
`;

export const HotspotBox = styled.div`
  position: absolute;
  border: 2px solid #3b82f6;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 4px;
  box-sizing: border-box;
`;
