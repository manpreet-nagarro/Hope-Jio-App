import { useState, useCallback } from "react";
import { ZOOM_CONFIG } from "../components/slotEditorCanvas/mainSlotCanvas/mainSlotCanvas.constants";

export const useCanvasZoom = () => {
  const [scale, setScale] = useState(1);

  const zoomIn = useCallback(() =>
    setScale((prev) => Math.min(prev + ZOOM_CONFIG.STEP, ZOOM_CONFIG.MAX)),
    []
  );

  const zoomOut = useCallback(() =>
    setScale((prev) => Math.max(prev - ZOOM_CONFIG.STEP, ZOOM_CONFIG.MIN)),
    []
  );

  const resetZoom = useCallback(() => setScale(1), []);

  return { scale, zoomIn, zoomOut, resetZoom };
};
