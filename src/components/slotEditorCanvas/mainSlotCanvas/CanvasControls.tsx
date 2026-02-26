import BackHandIcon from "@mui/icons-material/BackHand";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Tooltip from "@mui/material/Tooltip";
import { CanvasActionsBox, FigmaButton } from "../slotEditorCanvas.styles";
import { CANVAS_COLORS } from "./mainSlotCanvas.constants";
import { COLORS, FONTS } from "@constants/theme.constants";
import { ENTER_DELAY_TOOLTIP } from "@constants/commonConstants";

interface CanvasControlsProps {
  scale: number;
  dragEnabled: boolean;
  onToggleDrag: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetScale?: () => void;
}

export const CanvasControls = ({
  scale,
  dragEnabled,
  onToggleDrag,
  onZoomIn,
  onZoomOut,
  onResetScale,
}: CanvasControlsProps) => {
  return (
    <CanvasActionsBox>
      <Tooltip title={dragEnabled ? "Disable drag" : "Enable drag"} enterDelay={ENTER_DELAY_TOOLTIP} enterNextDelay={ENTER_DELAY_TOOLTIP} leaveDelay={100} arrow>
        <span>
          <FigmaButton
            onClick={onToggleDrag}
            sx={{ background: dragEnabled ? CANVAS_COLORS.DRAG_ENABLED_BG : undefined }}
          >
            <BackHandIcon />
          </FigmaButton>
        </span>
      </Tooltip>

      <Tooltip title="Zoom out" enterDelay={ENTER_DELAY_TOOLTIP} enterNextDelay={ENTER_DELAY_TOOLTIP} leaveDelay={100} arrow>
        <span>
          <FigmaButton onClick={onZoomOut}>
            <RemoveIcon />
          </FigmaButton>
        </span>
      </Tooltip>

      {scale === 1 ? (
        <span
          className="scaled__btn__text"
          style={{ fontFamily: FONTS.FONT_FAMILY, color: COLORS.TEXT_PRIMARY, }}
          aria-label="Reset zoom"
        >
          {Math.floor(scale * 100)}%
        </span>
      ) : (
        <Tooltip title="Reset zoom" enterDelay={ENTER_DELAY_TOOLTIP} enterNextDelay={ENTER_DELAY_TOOLTIP} leaveDelay={100} arrow>
          <span>
            <FigmaButton
              className="scaled__btn__text"
              sx={{ color: COLORS.TEXT_PRIMARY, cursor: 'pointer' }}
              style={{ fontFamily: FONTS.FONT_FAMILY }}
              onClick={onResetScale}
              aria-label="Reset zoom"
            >
              {Math.floor(scale * 100)}%
            </FigmaButton>
          </span>
        </Tooltip>
      )}

      <Tooltip title="Zoom in" enterDelay={ENTER_DELAY_TOOLTIP} enterNextDelay={ENTER_DELAY_TOOLTIP} leaveDelay={100} arrow>
        <span>
          <FigmaButton onClick={onZoomIn}>
            <AddIcon />
          </FigmaButton>
        </span>
      </Tooltip>
    </CanvasActionsBox>
  );
};
