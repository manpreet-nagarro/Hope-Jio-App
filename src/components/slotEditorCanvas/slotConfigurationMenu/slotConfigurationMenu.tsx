import {
  GridWrapper3,
  SlotConfigurationMenuItemType1,
  SlotConfigurationMenuItemType2,
  SlotConfigurationMenuItemTypeDanger1,
  SlotConfigurationMenuWrapper,
  UnderlinedBox,
} from "../slotEditorCanvas.styles";
import * as React from "react";
import { forwardRef } from "react";

export interface HeaderMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  disabledTooltip?: string;
  show?: boolean;
  showDivider?: boolean;
}

export interface ActionMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  disabledTooltip?: string;
  show?: boolean;
  showDivider?: boolean;
}

export interface DangerMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  disabledTooltip?: string;
  show?: boolean;
  showDivider?: boolean;
}

interface ConfigurationMenuProps {
  headerItem?: HeaderMenuItemProps;
  actionItems?: ActionMenuItemProps[];
  dangerItems?: DangerMenuItemProps[];
}

const ConfigurationMenu = forwardRef<HTMLDivElement, ConfigurationMenuProps>(
  ({ headerItem, actionItems = [], dangerItems = [] }, ref) => {
    const handleMenuClick = (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
    };

    return (
      <SlotConfigurationMenuWrapper
        ref={ref}
        onClick={handleMenuClick as React.MouseEventHandler<HTMLDivElement>}
        onMouseDown={handleMenuClick as React.MouseEventHandler<HTMLDivElement>}
        onTouchStart={
          handleMenuClick as React.TouchEventHandler<HTMLDivElement>
        }
      >
        {headerItem && headerItem.show && (
          <SlotConfigurationMenuItemType1 onClick={headerItem.onClick}>
            {headerItem.icon}
            <span>{headerItem.label}</span>
          </SlotConfigurationMenuItemType1>
        )}

        {actionItems.length > 0 && (
          <GridWrapper3>
            {actionItems.map((item) => {
              return (
                item.show && (
                  <>
                    {item.showDivider && <UnderlinedBox />}
                    <SlotConfigurationMenuItemType2
                      key={item.label}
                      onClick={item.onClick}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SlotConfigurationMenuItemType2>
                  </>
                )
              );
            })}
          </GridWrapper3>
        )}

        {dangerItems.length > 0 && (
          <>
            {dangerItems.map(
              (item) =>
                item.show && (
                  <>
                  {item.showDivider && <UnderlinedBox />}
                  <SlotConfigurationMenuItemTypeDanger1
                    key={item.label}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SlotConfigurationMenuItemTypeDanger1>
                  </>
                ),
            )}
          </>
        )}
      </SlotConfigurationMenuWrapper>
    );
  },
);

ConfigurationMenu.displayName = "ConfigurationMenu";

export default ConfigurationMenu;

// Slot Configuration Menu - Receives options and actions from parent
interface SlotConfigurationMenuProps {
  headerItem?: HeaderMenuItemProps;
  actionItems?: ActionMenuItemProps[];
  dangerItems?: DangerMenuItemProps[];
}

export const SlotConfigurationMenu = forwardRef<
  HTMLDivElement,
  SlotConfigurationMenuProps
>(({ headerItem, actionItems, dangerItems }, ref) => {
  return (
    <ConfigurationMenu
      ref={ref}
      headerItem={headerItem}
      actionItems={actionItems}
      dangerItems={dangerItems}
    />
  );
});

SlotConfigurationMenu.displayName = "SlotConfigurationMenu";
