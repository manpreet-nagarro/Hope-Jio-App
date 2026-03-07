import React, { useRef, useState } from "react";
import type { Hotspot } from "./hotspot.types";
import { CanvasWrapper, StyledImage, HotspotBox } from "./HotSpotCanvas.styles";

interface Props {
  imageUrl: string;
  hotspots: Hotspot[];
  setHotspots: (hotspots: Hotspot[]) => void;
  placementIndex: number | null;
  setPlacementIndex: (i: number | null) => void;
  setIsPlacing: (val: boolean) => void;
  onDeleteHotspot?: (hotspotId: number) => void;
  isReadOnly?: boolean;
}

const HotspotCanvas: React.FC<Props> = ({
  imageUrl,
  hotspots,
  setHotspots,
  placementIndex,
  setPlacementIndex,
  setIsPlacing,
  onDeleteHotspot,
  isReadOnly = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [resizingId, setResizingId] = useState<number | null>(null);
  const [resizeStart, setResizeStart] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // This is called on HotspotBox click
    e.stopPropagation();
    // The hotspot ID is passed through the event, we just need to start dragging
    // This will be handled by the specific hotspot handler
  };

  const handleHotspotMouseDown = (e: React.MouseEvent, spotId: number) => {
    if (isReadOnly) return;
    e.stopPropagation();
    setSelectedId(spotId);
    setDraggingId(spotId);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isReadOnly) return;
    // Handle resizing hotspots
    if (resizingId !== null && resizeStart && wrapperRef.current) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      const newWidth = Math.max(30, resizeStart.width + deltaX);
      const newHeight = Math.max(30, resizeStart.height + deltaY);

      const updatedHotspots = hotspots.map((spot) => {
        if (spot.id !== resizingId) return spot;

        return {
          ...spot,
          width: newWidth,
          height: newHeight,
        };
      });

      setHotspots(updatedHotspots);
      return;
    }

    // Handle dragging hotspots
    if (draggingId !== null && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const updatedHotspots = hotspots.map((spot) => {
        if (spot.id !== draggingId) return spot;

        const width = spot.width || 0;
        const height = spot.height || 0;

        // Center the box on cursor
        const newX = x - width / 2;
        const newY = y - height / 2;

        // Keep within canvas bounds
        const maxX = rect.width - width;
        const maxY = rect.height - height;

        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));

        return {
          ...spot,
          x: constrainedX,
          y: constrainedY,
        };
      });

      setHotspots(updatedHotspots);
    }
  };

  const handleCanvasMouseUp = () => {
    // 🔥 Finish placement properly
    if (placementIndex !== null) {
      const spot = hotspots[placementIndex];

      // Only mark placed if it has valid size
      if (
        spot &&
        spot.x !== null &&
        spot.y !== null &&
        spot.width &&
        spot.height
      ) {
        const updatedHotspots = hotspots.map((s, index) =>
          index === placementIndex ? { ...s, placed: true } : s,
        );
        setHotspots(updatedHotspots);

        setPlacementIndex(null);
        setIsPlacing(false); // ✅ stop placement mode
      }
    }

    setDraggingId(null);
    setResizingId(null);
    setResizeStart(null);
  };

  const handleResizeMouseDown = (e: React.MouseEvent, spotId: number) => {
    if (isReadOnly) return;
    e.stopPropagation();
    const spot = hotspots.find((s) => s.id === spotId);
    if (spot && spot.width && spot.height) {
      setResizingId(spotId);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: spot.width,
        height: spot.height,
      });
    }
  };

  const handleHotspotContextMenu = (e: React.MouseEvent, spotId: number) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent deletion if it's the last hotspot
    if (hotspots.length <= 1) {
      alert("At least one hotspot is mandatory");
      return;
    }

    if (onDeleteHotspot) {
      onDeleteHotspot(spotId);
    }
  };

  return (
    <CanvasWrapper
      ref={wrapperRef}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onMouseLeave={handleCanvasMouseUp}
      onDragStart={(e) => e.preventDefault()}
      style={{
        cursor: isReadOnly
          ? "default"
          : draggingId !== null
            ? "grabbing"
            : "default",
      }}
    >
      <StyledImage src={imageUrl} alt="Preview" />

      {/* Render all hotspots that have been initialized */}
      {hotspots.map((spot, index) => {
        // Only render hotspots that have valid dimensions
        if (
          spot.x === null ||
          spot.y === null ||
          spot.width === null ||
          spot.height === null
        ) {
          return null;
        }

        return (
          <HotspotBox
            key={spot.id}
            onMouseDown={(e) => handleHotspotMouseDown(e, spot.id)}
            onMouseUp={handleCanvasMouseUp}
            onContextMenu={(e) => handleHotspotContextMenu(e, spot.id)}
            style={
              {
                left: `${spot.x}px`,
                top: `${spot.y}px`,
                width: `${spot.width}px`,
                height: `${spot.height}px`,
                cursor: isReadOnly ? "default" : "move",
                border:
                  index === placementIndex
                    ? "2px dashed #3B82F6"
                    : selectedId === spot.id
                      ? "2px solid #2563EB"
                      : "2px solid #3B82F6",
                backgroundColor:
                  index === placementIndex
                    ? "rgba(59, 130, 246, 0.2)"
                    : "rgba(59, 130, 246, 0.1)",
                zIndex: draggingId === spot.id ? 20 : 5,
              } as React.CSSProperties
            }
          >
            <span
              style={{
                position: "absolute",
                top: -20,
                left: 0,
                background: "#3B82F6",
                color: "#fff",
                fontSize: 10,
                padding: "2px 6px",
                borderRadius: 4,
              }}
            >
              Hotspot {index + 1}
            </span>
            {!isReadOnly && (
              <div
                onMouseDown={(e) => handleResizeMouseDown(e, spot.id)}
                style={{
                  position: "absolute",
                  bottom: -6,
                  right: -6,
                  width: 12,
                  height: 12,
                  background: "#3B82F6",
                  border: "2px solid white",
                  borderRadius: "50%",
                  cursor: "nwse-resize",
                  zIndex: 30,
                }}
              />
            )}
          </HotspotBox>
        );
      })}
    </CanvasWrapper>
  );
};

export default HotspotCanvas;
