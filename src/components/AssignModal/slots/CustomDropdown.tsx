import * as React from "react";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import { COLORS, FONTS } from "@constants/theme.constants";

export interface CustomDropdownOption {
  key: string | number;
  type: "radio" | "checkbox";
  checked: boolean;
  disabled?: boolean;
  label: string;
  customNode?: React.ReactNode;
}

export interface CustomDropdownProps {
  options: CustomDropdownOption[];
  disabled?: boolean;
  onChange: (key: string | number) => void;
  label?: string;
  multiple?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  disabled,
  onChange,
  multiple = false,
}) => {
  // For radio: only one checked, for checkbox: multiple
  const value = multiple
    ? options.filter((o) => o.checked).map((o) => o.key)
    : options.find((o) => o.checked)?.key || "";

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    if (multiple) {
      const selected = event.target.value as Array<string | number>;
      options.forEach((opt) => {
        if (selected.includes(opt.key) !== opt.checked) {
          onChange(opt.key);
        }
      });
    } else {
      onChange(event.target.value as string | number);
    }
  };

  return (
    <FormControl fullWidth variant="standard" disabled={disabled}>
      <Select
        displayEmpty
        multiple={multiple}
        value={value}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => {
          if (multiple) {
            const selectedArr = Array.isArray(selected) ? selected : [selected];
            return options
              .filter((opt) => selectedArr.includes(opt.key))
              .map((opt) => opt.label)
              .join(", ");
          } else {
            const opt = options.find((o) => o.key === selected);
            return opt ? opt.label : "";
          }
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              width: 250,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.key}
            value={option.key}
            disabled={option.disabled}
            sx={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}
          >
            {multiple ? (
              <Checkbox checked={option.checked} />
            ) : (
              <Radio
                checked={option.checked}
                sx={{
                  width: 16,
                  height: 16,
                  marginTop: "0.2rem",
                  color: '#000000A6', // blue ring
                  '&.Mui-checked': {
                    color: '#000093', // blue ring when checked
                  },
                  '& .MuiSvgIcon-root': {
                    borderRadius: '50%',
                    width: "1rem",
                    height: "1rem",
                  },
                  '& .MuiRadio-root': {
                    borderRadius: '50%',
                  },
                  '& .MuiRadio-colorPrimary.Mui-checked': {
                    color: 'white',
                  },
                  '& .MuiRadio-colorPrimary': {
                    color: 'white',
                  },
                  '& .MuiSvgIcon-root circle': {
                    fill: '#000000A6', // white inner circle
                  },
                }}
              />
            )}
            <div>
              <ListItemText primary={option.label} sx={{fontFamily :FONTS.FONT_FAMILY, fontSize:"0.875rem", color: option.checked ? COLORS.TEXT_DARK : COLORS.TEXT_DARK_LIGHT}} />
              {option.customNode}
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
