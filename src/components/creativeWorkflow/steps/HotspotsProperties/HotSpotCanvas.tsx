import React, { useRef, useState } from "react";
import type { Hotspot } from "./hotspot.types";
import { CanvasWrapper, StyledImage, HotspotBox } from "./HotSpotCanvas.styles";

interface Props {
  imageUrl: string;
  hotspots: Hotspot[];
  setHotspots: React.Dispatch<React.SetStateAction<Hotspot[]>>;
  placementIndex: number | null;
  setPlacementIndex: (i: number | null) => void;
}

const HotspotCanvas: React.FC<Props> = ({
  imageUrl,
  hotspots,
  setHotspots,
  placementIndex,
  setPlacementIndex,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // This is called on HotspotBox click
    e.stopPropagation();
    // The hotspot ID is passed through the event, we just need to start dragging
    // This will be handled by the specific hotspot handler
  };

  const handleHotspotMouseDown = (e: React.MouseEvent, spotId: number) => {
    e.stopPropagation();
    setSelectedId(spotId);
    setDraggingId(spotId);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    // Handle dragging hotspots
    if (draggingId !== null && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setHotspots((prev) =>
        prev.map((spot) => {
          if (spot.id !== draggingId) return spot;

          const width = spot.width || 0;
          const height = spot.height || 0;

          // Center the box on cursor
          const newX = x - width / 2;
          const newY = y - height / 2;

          // Keep within canvas bounds
          const maxX = rect.width - width;
          const maxY = rect.height - height;

          return {
            ...spot,
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY)),
          };
        }),
      );
    }
  };

  const handleCanvasMouseUp = () => {
    // Mark as placed when user releases
    if (draggingId !== null && placementIndex !== null) {
      setHotspots((prev) =>
        prev.map((spot, index) =>
          index === placementIndex
            ? {
                ...spot,
                placed: true,
              }
            : spot,
        ),
      );
      setPlacementIndex(null);
    }
    setDraggingId(null);
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
        cursor: draggingId !== null ? "grabbing" : "default",
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
            style={
              {
                left: `${spot.x}px`,
                top: `${spot.y}px`,
                width: `${spot.width}px`,
                height: `${spot.height}px`,
                cursor: "move",
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
          </HotspotBox>
        );
      })}
    </CanvasWrapper>
  );
};

export default HotspotCanvas;
