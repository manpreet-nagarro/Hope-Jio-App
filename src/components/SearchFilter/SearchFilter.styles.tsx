import { FONTS } from "@constants/theme.constants";
import styled from "styled-components";

// Tweak MenuItem icon spacing for filter dropdowns
export const FilterDropdownIconWrapper = styled.div`
  .filter-dropdown-menu .MuiListItemIcon-root {
    min-width: 28px;
    padding: 0;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* ensure the Radio inside menu items has no extra padding */
  .filter-dropdown-menu .MuiRadio-root {
    padding: 0;
    margin: 0;
    width: 18px;
    height: 18px;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SearchWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: space-between;

  #create-cta-button {
    border-radius: 1000px;
    background-color: #3535f3;
    text-transform: capitalize;

    &:hover {
      background-color: #2c2cd9;
    }

    &.Mui-disabled {
      background-color: #e5e7eb !important;
      color: #9ca3af !important;
      cursor: not-allowed;
    }

    &.Mui-disabled:hover {
      background-color: #e5e7eb !important;
    }
  }

  #filter-button {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 1000px;
    background: transparent;
    border: none;
    color: #141414;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: -0.5%;
    cursor: pointer;
    border: 1px solid #595959;
  }

  #filter-button svg {
    color: rgba(0, 0, 0, 0.65);
    transition: color 0.2s ease;
  }

  #filter-button.active {
    background: #e8e8fc;
    border: 1px solid #000093;
    color: #000093;
  }

  #filter-button.active svg {
    color: #000093;
  }
`;

export const SearchBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  padding: 8px 12px;
  max-width: 560px;
  box-shadow: 0px 2px 12px 0px #0B3C7714;

  input {
    border: none;
    outline: none;
    flex: 1;
  }

  .clear-search-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    border: none;
    padding: 2px;
    cursor: pointer;

    color: rgba(0, 0, 0, 0.45);

    &:hover {
      color: rgba(0, 0, 0, 0.75);
    }
  }
`;

export const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

export const FiltersPanel = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 12px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  #clear-filters-button {
    display: flex;
    align-items: center;
    gap: 0px;
    padding: 8px;
    border-radius: 1000px;
    background: transparent;
    border: none;
    color: #e30513;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5rem;
    cursor: pointer;
  }

  #clear-filters-button svg {
    color: #e30513;
    width: 1rem;
    height: 1rem;
  }

  .filter-dropdown-menu {
    padding: 4px;
    padding-left: 0.25rem;
    padding-right: 1rem;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  display: flex;
  align-items: center;
`;

export const PlatformPill = styled.button<{ active?: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid ${({ active }) => (active ? "#000093" : "#d1d5db")};
  color: ${({ active }) => (active ? "#000093" : "#595959")};
  background: white;
  cursor: pointer;
  margin-right: 6px;
  display: flex;
  align-items: center;
  gap: 8px;

  .platform-icon svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  .platform-name {
    font-size: 0.875rem;
    font-family: ${FONTS.FONT_FAMILY};
    line-height: 24px;
  }
`;

export const PlatformGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  /* START | */
  &::before {
    content: "|";
    margin-right: 8px;
    color: rgba(0, 0, 0, 0.4);
    height: 24px;
  }

  /* END | */
  &::after {
    content: "|";
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.4);
    height: 24px;
  }

  .platform-label {
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
  }

  .platform-pills-container {
    display: flex;
    gap: 8px;
  }
`;
