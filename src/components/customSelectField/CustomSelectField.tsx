import { useState } from "react";
import type { SelectFieldProps } from "./CustomSelectField.types";
import { ListItemIcon, OutlinedInput, Radio, Select, type SelectChangeEvent } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioUnchecked from "@assets/icons-svg/radioUnchecked";
import RadioChecked from "@assets/icons-svg/radioChecked";
import { FilterMenuItem, SelectControlWrapper, SelectOverlay, FilterFormControl } from "./CustomSelectField.styles";
import { UI_TEXTS } from "@constants/text.constants";

const filterMenuProps = {
  PaperProps: {
    sx: {
      boxShadow: "0px 4px 16px 0px #00000014",
      borderRadius: "1rem",
      mt: "0.5rem",
      p: 0,
      scrollbarWidth: "none",
      "& .MuiMenu-list": {
        maxHeight: "320px",
        marginRight: "8px",
        paddingTop: "0rem",
        paddingLeft: "0rem",
        overflowY: "auto",
      },
    },
  },
  // keep MenuListProps for completeness; some MUI versions pick this up
  MenuListProps: {
    sx: {
      maxHeight: "320px",
      padding: "4px 8px",
      boxSizing: "border-box",
      marginRight: "8px",
      marginTop: "8px",
    },
  },
};

export function CustomSelectField({
  controlRef,
  selected,
  ariaLabel,
  value,
  onChangeValue,
  options = [],
  emptyLabel = UI_TEXTS.SELECT.ALL,
  normalizeOption,
  defaultOptionText,
  renderNormalizeText,
  showDefaultOption = true
}: Readonly<SelectFieldProps>) {
  const [open, setOpen] = useState(false);

  const handleChange = (e: SelectChangeEvent<string>) => {
    onChangeValue(e.target.value);
    setOpen(false);
  };

  return (
    <SelectControlWrapper>
      <FilterFormControl
        ref={controlRef}
        className={`${selected ? "selected" : ""} ${open ? "open" : ""}`.trim()}
      >
        {!open && (
          <SelectOverlay onMouseDown={() => setOpen(true)} />
        )}

        <Select
        open={open}
        onClose={() => setOpen(false)}
        aria-label={ariaLabel}
        value={value ?? ""}
        onChange={handleChange}
        renderValue={(selectedVal: string) => {
          if (!selectedVal) return emptyLabel;
          const matched = options.find((opt) =>
            String(normalizeOption ? normalizeOption(opt) : opt) ===
            String(selectedVal)
          );
          const renderedValue = matched ?? String(selectedVal)
          return renderNormalizeText ? renderNormalizeText(renderedValue) : renderedValue;
        }}
        size="small"
        displayEmpty
        fullWidth
        input={<OutlinedInput />}
        MenuProps={filterMenuProps}
        IconComponent={ExpandMoreIcon}
      >
        {showDefaultOption && <FilterMenuItem className="filter-dropdown-menu" value="">
          <ListItemIcon>
            <Radio
              size="small"
              checked={(value ?? "") === ""}
              icon={<RadioUnchecked />}
              checkedIcon={<RadioChecked />}
            />
          </ListItemIcon>
          {defaultOptionText || emptyLabel}
        </FilterMenuItem>}

        {options.map((opt) => {
          const optValue = normalizeOption ? normalizeOption(opt) : opt;
          return (
            <FilterMenuItem key={opt} value={optValue} className="filter-dropdown-menu">
              <ListItemIcon>
                <Radio
                  size="small"
                  checked={(value ?? "") === optValue}
                  icon={<RadioUnchecked />}
                  checkedIcon={<RadioChecked />}
                />
              </ListItemIcon>
              {opt}
            </FilterMenuItem>
          );
        })}
        </Select>
      </FilterFormControl>
    </SelectControlWrapper>
  );
}