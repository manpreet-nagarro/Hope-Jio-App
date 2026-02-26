import { useRef, useState, useCallback, useEffect } from "react";

export const useCanvasPan = (dragEnabled: boolean) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isCurrentlyPanning, setIsCurrentlyPanning] = useState(false);
  const isPanning = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!dragEnabled) return;
      isPanning.current = true;
      setIsCurrentlyPanning(true);
      last.current = { x: e.clientX, y: e.clientY };
    },
    [dragEnabled]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragEnabled || !isPanning.current) return;

      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;

      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      last.current = { x: e.clientX, y: e.clientY };
    },
    [dragEnabled]
  );

  const onMouseUp = useCallback(() => {
    isPanning.current = false;
    setIsCurrentlyPanning(false);
  }, []);

  const getCursorStyle = () => {
    if (!dragEnabled) return "default";
    return isCurrentlyPanning ? "grabbing" : "grab";
  };

  // Cleanup: stop panning if dragEnabled becomes false
  useEffect(() => {
    if (!dragEnabled) {
      isPanning.current = false;
      const raf = requestAnimationFrame(() => setIsCurrentlyPanning(false));
      return () => cancelAnimationFrame(raf);
    }
    return undefined;
  }, [dragEnabled]);

  return {
    offset,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    getCursorStyle,
  };
};
