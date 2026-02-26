import * as React from "react";
import { useState, useCallback } from "react";
import { IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SvgNormalize, StyledListText, StyledDivider, SpanClick } from "./WireframeActionMenu.styles";

export type ActionItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  showDivider?:boolean;
  disabled?: boolean;
  disabledTooltip?: string;
  show: boolean; // new property to control visibility of the item
};

type Props = {
  items: ActionItem[];
  trigger?: React.ReactNode; // optional custom trigger, defaults to MoreVertIcon button
  menuPaperSx?: object;
};

const ActionMenu: React.FC<Props> = ({ items, trigger, menuPaperSx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleItemClick = useCallback((cb?: () => void) => () => {
    cb?.();
    handleClose();
  }, [handleClose]);

  return (
    <>
      {trigger ? (
        <SpanClick onClick={handleOpen}>{trigger}</SpanClick>
      ) : (
        <IconButton onClick={handleOpen} size="small" aria-label="actions">
          <MoreVertIcon />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={2}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            boxShadow: "0px 4px 16px 0px #00000014",
            borderRadius: "16px",
            minWidth: 200,
            padding: "0px",
            gap: "8px",
            ...(menuPaperSx),
          },
        }}
      >
        {items.flatMap((it) => {
          const elements: React.ReactNode[] = [];

          if (it.showDivider) {
            elements.push(<StyledDivider key={`${it.id}-divider`} />);
          }

          const menuItem = (
            <MenuItem
              key={it.id}
              sx={{ gap: "0rem" }}
              onClick={it.disabled ? undefined : handleItemClick(it.onClick)}
              disabled={!!it.disabled}
            >
              {it.icon ? (
                <ListItemIcon sx={{ minWidth: "max-content !important" }}>
                  {it.icon}
                </ListItemIcon>
              ) : null}
              <SvgNormalize />
              <StyledListText primary={it.label} className={it.className} />
            </MenuItem>
          );
          if (it.disabled) {
            elements.push(
              <Tooltip key={it.id + '-tooltip'} title={"Disabled"} placement="left" arrow>
                <span style={{ display: 'flex' }}>{menuItem}</span>
              </Tooltip>
            );
          } else {
            elements.push(menuItem);
          }

          return elements;
        })}
      </Menu>
    </>
  );
};

export default ActionMenu;
