import { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DottedBackground,
  DottedBackgroundOuter,
} from "./mainSlotCanvas.styles";
import {
  CanvasWrapper,
  MobileSlotsContentWrapper,
  TransformWrapper,
  StatuBar,
  CanvasInnerFrame,
} from "../slotEditorCanvas.styles";
import { SlotContainer } from "../slotContainer/slotContainer";
import { FIXED_SLOTS_1, FIXED_SLOTS_2 } from "./mainSlotCanvas.constants";
import { useCanvasZoom } from "../../../hooks/useCanvasZoom";
import { useCanvasPan } from "../../../hooks/useCanvasPan";
import { CanvasControls } from "./CanvasControls";
import { FixedSlotsRow } from "./FixedSlotsRow";
import { moveSlot } from "../../../store/slotsSlice/slotsSlice";
import type { RootState } from "../../../store/store";
import { PLATFORMS } from "@constants/commonConstants";
import { IconButtonPlaceholder } from "./IconButtonPlaceholder";
import { DropdownPlaceholder } from "./DropDownPlaceholder";

export const SlotCanvas = () => {
  const dispatch = useDispatch();
  const [dragEnabled, setDragEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const outerDivRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);
  const slots = useSelector((state: RootState) => state.slots.slots);
  const platformName = useSelector(
    (state: RootState) => state.wireframe.selectedWireframe?.platform,
  );

  const { scale, zoomIn, zoomOut, resetZoom } = useCanvasZoom();
  const { offset, onMouseDown, onMouseMove, onMouseUp, getCursorStyle } =
    useCanvasPan(dragEnabled);

  const handleMoveSlot = useCallback(
    (from: number, to: number) => {
      dispatch(moveSlot({ from, to }));
    },
    [dispatch],
  );

  const toggleDragMode = useCallback(() => {
    setDragEnabled((prev) => !prev);
  }, []);

  useEffect(() => {
    const isInputLike = (el: Element | null) => {
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (el instanceof HTMLElement && el.isContentEditable)
      );
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        !e.repeat &&
        isHovered &&
        !isInputLike(document.activeElement)
      ) {
        e.preventDefault();
        toggleDragMode();
      }
    };

    if (isHovered) {
      globalThis.addEventListener("keydown", onKeyDown);
    }

    return () => {
      globalThis.removeEventListener("keydown", onKeyDown);
    };
  }, [isHovered, toggleDragMode]);

  const [outerDivRefWidth, setOuterDivRefWidth] = useState(0);
  const [innerDivRefScrollWidth, setInnerDivRefScrollWidth] = useState(0);

  useEffect(() => {
    const updateWidths = () => {
      setOuterDivRefWidth(outerDivRef.current?.clientWidth || 0);
      setInnerDivRefScrollWidth(innerDivRef.current?.scrollWidth || 0);
    };
    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => {
      window.removeEventListener('resize', updateWidths);
    };
  }, [slots]);

  return (
    <>
      <DottedBackgroundOuter
        ref={outerDivRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        sx={{
          overflowX:
            outerDivRefWidth + 50 < innerDivRefScrollWidth ? "scroll" : "hidden",
            cursor: getCursorStyle()
        }}
      >
        <DottedBackground
          ref={innerDivRef}
          sx={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            overflowY: "visible",
            maxWidth: "100%",
          }}
        >
          <TransformWrapper
            
            style={{ cursor: getCursorStyle() }}
          >
            <CanvasWrapper>
              <CanvasInnerFrame className="canvas_inner_frame" $platformName={platformName}>
                {platformName !== PLATFORMS.MOBILE && <IconButtonPlaceholder />}
                {platformName !== PLATFORMS.MOBILE && <DropdownPlaceholder />}
                {platformName === PLATFORMS.MOBILE && <StatuBar />}
                <MobileSlotsContentWrapper>
                  {platformName === PLATFORMS.MOBILE && (
                    <FixedSlotsRow slots={FIXED_SLOTS_1} variant="variant1" />
                  )}
                  {platformName === PLATFORMS.MOBILE && (
                    <FixedSlotsRow slots={FIXED_SLOTS_2} variant="variant2" />
                  )}
                  <SlotContainer slots={slots} onMoveSlot={handleMoveSlot} />
                </MobileSlotsContentWrapper>
              </CanvasInnerFrame>
            </CanvasWrapper>
          </TransformWrapper>
        </DottedBackground>
      </DottedBackgroundOuter>

      <CanvasControls
        scale={scale}
        dragEnabled={dragEnabled}
        onToggleDrag={toggleDragMode}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetScale={resetZoom}
      />
    </>
  );
};
