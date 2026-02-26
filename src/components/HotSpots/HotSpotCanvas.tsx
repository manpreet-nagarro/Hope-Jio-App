import { useRef } from "react";
import { useHotspots } from "../../hooks/useHotspots";
import {
  HotspotClosedIcon,
  HotSpotImage,
  HotSpotStyledbadge,
  HotSpotStyledBox,
  HotSpotStyledWrapper,
} from "./HotSpot.styles";
import type { Hotspot } from "./HotSpots.types";

const getAriaLabel = (h: Hotspot | null, activeId: string | null) => {
  return h?.id === activeId
    ? "Selected hotspot - press Delete to remove, drag to move, resize from edges"
    : "Hotspot - click to select";
};

const getCursor = (h: Hotspot | null) => {
  return h?.id === "temp" ? "default" : "pointer";
};

export default function HotspotCanvas() {
  const {
    containerRef,
    hotspots,
    temp,
    activeId,
    setActiveId,
    startDraw,
    deleteActiveHotspot,
  } = useHotspots();
  const canvasRef = useRef<HTMLDivElement>(null);

  const detectResizeEdge = (
    clientX: number,
    clientY: number,
    hotspot: { xPct: number; yPct: number; wPct: number; hPct: number },
  ): string | null => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const hotspotX = (hotspot.xPct / 100) * rect.width;
    const hotspotY = (hotspot.yPct / 100) * rect.height;
    const hotspotW = (hotspot.wPct / 100) * rect.width;
    const hotspotH = (hotspot.hPct / 100) * rect.height;
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    const threshold = 8;

    const isLeft = Math.abs(mouseX - hotspotX) < threshold;
    const isRight = Math.abs(mouseX - (hotspotX + hotspotW)) < threshold;
    const isTop = Math.abs(mouseY - hotspotY) < threshold;
    const isBottom = Math.abs(mouseY - (hotspotY + hotspotH)) < threshold;

    if (isTop && isLeft) return "tl";
    if (isTop && isRight) return "tr";
    if (isBottom && isLeft) return "bl";
    if (isBottom && isRight) return "br";
    if (isLeft) return "l";
    if (isRight) return "r";
    if (isTop) return "t";
    if (isBottom) return "b";
    return null;
  };

  const getCursorForEdge = (edge: string | null): string => {
    if (!edge) return "default";
    if (edge === "tl" || edge === "br") return "nwse-resize";
    if (edge === "tr" || edge === "bl") return "nesw-resize";
    if (edge === "l" || edge === "r") return "ew-resize";
    if (edge === "t" || edge === "b") return "ns-resize";
    return "default";
  };

  const isPointInHotspot = (
    clientX: number,
    clientY: number,
    hotspot: { xPct: number; yPct: number; wPct: number; hPct: number },
  ): boolean => {
    const rect = containerRef.current!.getBoundingClientRect();
    const hotspotX = (hotspot.xPct / 100) * rect.width;
    const hotspotY = (hotspot.yPct / 100) * rect.height;
    const hotspotW = (hotspot.wPct / 100) * rect.width;
    const hotspotH = (hotspot.hPct / 100) * rect.height;
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    return (
      mouseX >= hotspotX &&
      mouseX <= hotspotX + hotspotW &&
      mouseY >= hotspotY &&
      mouseY <= hotspotY + hotspotH
    );
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const activeHotspot = hotspots.find((h) => h.id === activeId);

    if (!activeHotspot) {
      canvasRef.current.style.cursor = "crosshair";
      return;
    }

    const edge = detectResizeEdge(e.clientX, e.clientY, activeHotspot);
    if (edge) {
      canvasRef.current.style.cursor = getCursorForEdge(edge);
      return;
    }

    if (isPointInHotspot(e.clientX, e.clientY, activeHotspot)) {
      canvasRef.current.style.cursor = "move";
    } else {
      canvasRef.current.style.cursor = "crosshair";
    }
  };

  return (
    <HotSpotStyledWrapper
      ref={(el) => {
        containerRef.current = el;
        canvasRef.current = el;
      }}
      onMouseDown={startDraw}
      onMouseMove={handleCanvasMouseMove}
      role="application"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Delete" && activeId) {
          e.preventDefault();
        }
      }}
      aria-label="Hotspot creation and editing canvas"
      style={{
        position: "relative",
        width: 700,
        height: 450,
        userSelect: "none",
        outline: "none",
      }}
    >
      <HotSpotImage
        src="https://cdn.brandfetch.io/ajio.com/fallback/transparent/w/600/h/200/banner?c=1bfwsmEH20zzEfSNTed"
        style={{ width: "100%", height: "100%" }}
      />
      {[...hotspots, temp].filter(Boolean).map((h, index) => (
        <HotSpotStyledBox
          key={h!.id}
          onClick={(e) => {
            e.stopPropagation();
            setActiveId(h!.id);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Delete") {
              e.preventDefault();
              e.stopPropagation();
              const confirmed = globalThis.confirm(
                "Are you sure you want to delete this hotspot?",
              );
              if (confirmed) {
                deleteActiveHotspot();
              }
            } else if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveId(h!.id);
            }
          }}
          aria-label={
            h!.id === "temp"
              ? "Temporary hotspot preview"
              : getAriaLabel(h, activeId)
          }
          style={{
            position: "absolute",
            left: `${h!.xPct}%`,
            top: `${h!.yPct}%`,
            width: `${h!.wPct}%`,
            height: `${h!.hPct}%`,
            border: h!.id === activeId ? "2px solid blue" : "2px solid #3B82F6",
            background: "transparent",
            cursor: h!.id === activeId ? "move" : getCursor(h),
          }}
        >
          <HotSpotStyledbadge>
            <span>Hotspot {index + 1}</span>
            <HotspotClosedIcon
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
                const confirmed = globalThis.confirm(
                  "Are you sure you want to delete this hotspot?",
                );
                if (confirmed) {
                  deleteActiveHotspot(h!.id);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              X
            </HotspotClosedIcon>
          </HotSpotStyledbadge>
        </HotSpotStyledBox>
      ))}
    </HotSpotStyledWrapper>
  );
}
