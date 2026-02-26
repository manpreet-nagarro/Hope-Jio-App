import { BlankSlotBox, SlotComponentWrapper, StyledComponentItemButton } from "../slotEditorCanvas.styles";
import { UI_TEXTS } from "@constants/text.constants";
import { COLORS, FONTS, SPACING } from "@constants/theme.constants";
import type { Slot } from "../slotEditorCanvas.types";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { useClickOutsideMultiple } from "@hooks/useClickOutside";
import { BlockIcon } from "@assets/icons-svg/blockIcon";
import { SlotComponentItem } from "../slotComponentItem/slotComponentitem";
import { usePrivilege } from "@hooks/usePrivilege";
import type { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import { setDragStartFromSidebar } from "@store/slotsSlice/slotsSlice";

interface SlotComponentsProps {
  slot: Slot;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, componentData: { children?: unknown[] }) => void;
  onComponentDragStart: (index: number) => void;
  onComponentDrop: (dragIndex: number, dropIndex: number) => void;
  onDuplicateComponent: (componentIndex: number) => void;
  onDeleteComponent: (componentIndex: number) => void;
   onUpdateComponentData: (componentIndex: number, data: { children?: unknown[] }) => void;
   handleComponentSelection: (componentIndex: number) => void;
   slotIndex: number;
}

export const SlotComponents: React.FC<SlotComponentsProps> = ({
  slot,
  onDragOver,
  onDrop,
  onComponentDragStart,
  onComponentDrop,
  onDuplicateComponent,
  onDeleteComponent,
  onUpdateComponentData,
  handleComponentSelection,
  slotIndex
}) => {
  const dispatch = useDispatch();
  const { dragStartFromSidebar } = useSelector((state: RootState) => state.slots);
  const {canDragDropComponent} = usePrivilege();
  const dragIndex = useRef<number | null>(null);
  const dragCounter = useRef(0);
  const [showMismatch, setShowMismatch] = useState(false);
  const [openComponentIndex, setOpenComponentIndex] = useState<number | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const blankRef = useRef<HTMLDivElement | null>(null);
  const hasScrolledToBlank = useRef(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Auto-hide mismatch message after 3 seconds
  useEffect(() => {
    if (!showMismatch) return;

    const timer = setTimeout(() => {
      setShowMismatch(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showMismatch]);

  useEffect(() => {
    // reset refs array before each render cycle so we can re-collect
    itemRefs.current = [];
  });

  // close open component menu when clicking outside any component item
  useClickOutsideMultiple(itemRefs, () => setOpenComponentIndex(null), true);
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);

  const hasComponents = slot.components.length > 0;

  // Check if there's a component type mismatch in the slot
  const hasMismatch = hasComponents && slot.components.length > 1 && 
    slot.components.some(comp => comp.type !== slot.components[0].type);

  const handleDrop = (e: React.DragEvent) => {
    const droppedType = e.dataTransfer.getData("component");
    const droppedComponentData = e.dataTransfer.getData("component-data") ? JSON.parse(e.dataTransfer.getData("component-data")) : null;
    
    // Check if dropped component creates a mismatch
    if (hasComponents && droppedType) {
      const firstComponentType = slot.components[0].type;
      if (droppedType === firstComponentType) {
        setShowMismatch(false);
      } else {
        setShowMismatch(true);
      }
    } else {
      setShowMismatch(false);
    }
    
    onDrop(e, droppedComponentData);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current += 1;
    try {
      const type = e.dataTransfer.getData("component");
      if (type) setIsDragOver(true);
    } catch (err) {
      console.error("Error during drag enter handling", err);
      setIsDragOver(true);
    }
    // Ensure onDragOver is still invoked even if dataTransfer access fails
    try {
      onDragOver(e);
    } catch (err) {
      console.error("Error in onDragOver handler", err);
    }
  };

  const handleDragLeave = () => {
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) dispatch(setDragStartFromSidebar(false));
    if (dragCounter.current === 0) setIsDragOver(false);
  };

  useEffect(() => {
    if (isDragOver && blankRef.current && !hasScrolledToBlank.current && dragStartFromSidebar) {
      hasScrolledToBlank.current = true;
      try {
        blankRef.current.scrollIntoView({ behavior: "auto", block: "center" });
      } catch (err) {
        console.error("Error scrolling blank slot into view ", err);
      }
    }
    if (!isDragOver) {
      hasScrolledToBlank.current = false;
    }
  }, [isDragOver, dragStartFromSidebar]);

  // Reset mismatch when slot becomes empty or when components match
  React.useEffect(() => {
    if (!hasComponents) {
      setShowMismatch(false);
    } else if (hasComponents && !hasMismatch) {
      // If all components now match, clear the error
      const allSameType = slot.components.every(comp => comp.type === slot.components[0].type);
      if (allSameType) {
        setShowMismatch(false);
      }
    }
  }, [hasComponents, hasMismatch, slot.components]);

  // Determine the message to display
  const getBlankMessage = () => {
    if (showMismatch) {
      return UI_TEXTS.SLOT.MISMATCH_MESSAGE;
    }
    return UI_TEXTS.SLOT.BLANK_MESSAGE;
  };

  return (
    <SlotComponentWrapper 
      onDragOver={(e : React.DragEvent<HTMLDivElement>) => { e.preventDefault();setIsDragOver(true); onDragOver(e); }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={(e : React.DragEvent<HTMLDivElement>) => { handleDrop(e); setIsDragOver(false); dragCounter.current = 0;dispatch(setDragStartFromSidebar(false)); }}
    >

      {slot.components.map((comp, index) => (
        <StyledComponentItemButton
          key={comp.id}
          draggable={canDragDropComponent}
          onDragStart={() => {
            dragIndex.current = index;
            onComponentDragStart(index);
            dispatch(setDragStartFromSidebar(false));
          }}
          onDragOver={(e : React.DragEvent<HTMLDivElement>) => e.preventDefault()}
          onDrop={() => {
            if (dragIndex.current !== null) {
              onComponentDrop(dragIndex.current, index);
              dragIndex.current = null;
            }
          }}
          style={{cursor: canDragDropComponent ? 'grab' : 'default'}}
        >
          <SlotComponentItem
            type={comp.type}
            index={index}
            isMenuOpen={openComponentIndex === index}
            onOpenMenu={() => setOpenComponentIndex(index)}
            onCloseMenu={() => setOpenComponentIndex(null)}
            onDuplicate={() => { onDuplicateComponent(index); setOpenComponentIndex(null); }}
            onDelete={() => { onDeleteComponent(index); setOpenComponentIndex(null); }}
            itemRef={(el) => { if (el) itemRefs.current.push(el); }}
            isTooltipOpen={openTooltipIndex === index}
            onHoverEnter={() => setOpenTooltipIndex(index)}
            onHoverLeave={() => setOpenTooltipIndex(null)}
            comp={comp}
            bannerText={comp.data?.bannerText ?? UI_TEXTS.COMPONENT.BANNER_CALL_OUT}
            onBannerTextSave={() =>
              onUpdateComponentData(index, { ...comp.data })
            }
            handleComponentSelection={() => handleComponentSelection(index)}
            slotIndex={slotIndex}
            slotId={slot.id}
          />
        </StyledComponentItemButton>
      ))}

      {(showMismatch || !hasComponents || (dragStartFromSidebar && isDragOver)) && <BlankSlotBox ref={blankRef} style={{ 
        height: hasComponents ? 'auto' : '105px',
        flex: hasComponents ? 1 : 'none',
        minHeight: hasComponents ? '100%' : 'auto',
        color: showMismatch ? COLORS.TEXT_SECONDARY : undefined,
        width: SPACING.WIDTH_FULL,
        minWidth: SPACING.WIDTH_FULL,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        justifyItems: 'center',
        fontSize: "0.75rem",
        fontFamily: FONTS.FONT_FAMILY
      }}>
        {showMismatch && <BlockIcon size={20} color={COLORS.TEXT_MUTED} />}
        {getBlankMessage()}
      </BlankSlotBox>}
    </SlotComponentWrapper>
  );
};
