import * as React from "react";
import type { CompactListPopoverProps } from "./CompactListPopover.types";
import {
  PopoverListBox,
  PopoverListItemText,
  PrimaryText,
  CountBadgeText,
  HoverBox,
  HoverBoxScroll,
  Wrapper,
} from "./CompactListPopover.styles";

const CompactListPopover: React.FC<CompactListPopoverProps> = ({
  items = [],
  visibleCount = 1,
  className,
}) => {
  const list = items ?? [];
  const visible = list.slice(0, visibleCount);
  const remaining = list.slice(visibleCount);

  return (
    <Wrapper className={className}>
      <PrimaryText>
        {visible.length > 0 && visible[0] && typeof visible[0] === 'object' && 'name' in visible[0]
          ? visible[0].name
          : "-"}
      </PrimaryText>
      {remaining.length > 0 && <CountBadgeText>+{remaining.length}</CountBadgeText>}

      {remaining.length > 0 && <HoverBox role="menu">
        <HoverBoxScroll>
          <PopoverListBox>
            {remaining.map((it) => (
              <PopoverListItemText key={it.id}>{it.name}</PopoverListItemText>
            ))}
          </PopoverListBox>
        </HoverBoxScroll>
      </HoverBox>}
    </Wrapper>
  );
};

export default CompactListPopover;
