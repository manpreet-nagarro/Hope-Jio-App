import { DragHandle, IconButtonNoPadding, SlotItemTitleBox, TitleChangeWrapper, TitleInput } from "../slotEditorCanvas.styles";
import TruncatedTooltip from "@components/common/TruncatedTooltip";
import { UI_TEXTS } from "@constants/text.constants";
import { COLORS, FONTS } from "@constants/theme.constants";
import DragHandleIcon from "@assets/icons-svg/dragHandleIcon";
import MoreVertIcon from "@assets/icons-svg/moreVertIcon";
import { SlotConfigurationMenu, type ActionMenuItemProps, type DangerMenuItemProps, type HeaderMenuItemProps } from "../slotConfigurationMenu/slotConfigurationMenu";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import EditPenIcon from "@assets/icons-svg/editPenIcon";

interface SlotHeaderProps {
  isConfigMenuOpen: boolean;
  onDragHandleDown: (e: React.PointerEvent) => void;
  onMoreVertClick: () => void;
  configMenuOptions: {
    headerItem: HeaderMenuItemProps;
    actionItems: ActionMenuItemProps[];
    dangerItems: DangerMenuItemProps[];
  };
  itemRef?: (el: HTMLButtonElement | null) => void;
  slotTitle: string;
  onTitleSave: (newTitle: string) => void;
  canDragDropSlot?: boolean;
  canEditSlotLabel?: boolean;
}

export const SlotHeader: React.FC<SlotHeaderProps> = ({
  isConfigMenuOpen,
  onDragHandleDown,
  onMoreVertClick,
  configMenuOptions,
  itemRef,
  slotTitle,
  onTitleSave,
  canDragDropSlot,
  canEditSlotLabel
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(slotTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setTitleValue(slotTitle);
  }, [slotTitle]);

  const handleSaveTitle = () => {
    const trimmedTitle = titleValue.trim() || UI_TEXTS.SLOT.TITLE_LABEL;
    onTitleSave(trimmedTitle);
    setTitleValue(trimmedTitle);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent parent/global handlers from intercepting Space key so spaces can be entered
    if (e.key === " " || e.code === "Space") {
      e.stopPropagation();
      return;
    }

    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      setTitleValue(slotTitle);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setTitleValue(slotTitle);
    setIsEditing(false);
  };

  return (
    <SlotItemTitleBox>
      {canDragDropSlot ? <DragHandle onPointerDown={onDragHandleDown}>
        <DragHandleIcon size={7} color={COLORS.TEXT_SECONDARY} />
      </DragHandle> : <div></div>}

      <TitleChangeWrapper>
        {isEditing && canEditSlotLabel ? (
          <TitleInput
            ref={inputRef}
            type="text"
            value={titleValue}
            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setTitleValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleCancelEdit}
          />
        ) : (
          <div className="title__wrapper" style={{display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0}}>
            <TruncatedTooltip
              text={slotTitle || UI_TEXTS.SLOT.TITLE_LABEL}
              forceOpen={isConfigMenuOpen}
              placement="top"
              tooltipSx={{ backgroundColor: "#061951", color: "#ffffff", opacity: 1 }}
              arrowColor="#061951"
              style={{ fontFamily: FONTS.FONT_FAMILY, fontSize: "0.875rem", color: COLORS.TEXT_DARK, flex: 1, minWidth: 0 }}
            />

            {canEditSlotLabel ? <IconButtonNoPadding onClick={() => setIsEditing(true)} sx={{ flex: '0 0 auto' }}>
              <EditPenIcon size={14} color={COLORS.TEXT_DARK} />
            </IconButtonNoPadding> : null}
          </div>
        )}
      </TitleChangeWrapper>

      <IconButtonNoPadding ref={itemRef} onClick={onMoreVertClick}>
        <MoreVertIcon size={16} color={COLORS.TEXT_DARK} />
      </IconButtonNoPadding>

      {isConfigMenuOpen && (
        <SlotConfigurationMenu
          headerItem={configMenuOptions.headerItem}
          actionItems={configMenuOptions.actionItems}
          dangerItems={configMenuOptions.dangerItems}
        />
      )}
    </SlotItemTitleBox>
  );
};
