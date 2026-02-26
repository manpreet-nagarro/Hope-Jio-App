import RightIcon from "@assets/icons-svg/rightIcon";
import { DropdownItem, DropdownLabel, DropdownPlaceholderItemWrapper, DropdownPlaceholderWrapper, ArrowIconWrapper } from "./DropdownPlaceholder.styles";
import { COLORS } from "@constants/theme.constants";

const items: string[] = ["Home", "Men", "Women", "Kids", "Beauty"];
export const DropdownPlaceholder = () => {
  return (
    <DropdownPlaceholderWrapper>
      <DropdownPlaceholderItemWrapper>
        {items.map((i) => (
          <DropdownItem key={i}>
            <DropdownLabel>{i}</DropdownLabel>
            <ArrowIconWrapper>
                <RightIcon color={COLORS.TEXT_SECONDARY} size={10} />
            </ArrowIconWrapper>
          </DropdownItem>
        ))}
      </DropdownPlaceholderItemWrapper>
    </DropdownPlaceholderWrapper>
  );
};
