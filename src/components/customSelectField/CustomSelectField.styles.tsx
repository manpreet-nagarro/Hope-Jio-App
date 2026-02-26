import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";
import { FormControl, MenuItem } from "@mui/material";

export const SelectControlWrapper = styled.div`
  position: relative;
`;

export const SelectOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: transparent;
  cursor: pointer;
`;

export const FilterMenuItem = MuiStyled(MenuItem)(() => ({
  fontSize: "14px",
  padding: "4px",
  paddingRight: "1rem",
  height: "36px",
  backgroundColor: "#ffffff !important",

  "&:hover": {
    backgroundColor: "#fff",
  },
  "&:selected": {
    backgroundColor: "#fff",
  }
}));

export const FilterFormControl = MuiStyled(FormControl)(() => ({
  minWidth: 125,

  "& .MuiOutlinedInput-root": {
    height: "40px",
    borderRadius: "34px",
    paddingRight: "44px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    cursor: "pointer",
    background: "#ffffff",
  },

  "& .MuiOutlinedInput-input": {
    /* reduce top padding so the control doesn't show an unnecessary gap */
    padding: "8px 14px",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
    display: "flex",
    alignItems: "center",
  },

  "& .MuiInputLabel-root": {
    fontSize: "14px",
    fontWeight: 500,
    color: "rgba(0,0,0,0.65)",
    top: "50%",
    transform: "translate(14px, -50%)",
    pointerEvents: "none",
  },

  "& .MuiInputLabel-shrink": {
    top: "4px",
    transform: "translate(14px, 0) scale(0.75)",
  },

  "& .MuiSelect-icon": {
    top: "50%",
    transform: "translateY(-50%)",
    right: "12px",
    color: "rgba(0,0,0,0.65)",
    cursor: "pointer",
    pointerEvents: "auto",
  },
  // ensure the inner SVG doesn't intercept clicks so the Select receives them
  "& .MuiSelect-icon svg": {
    pointerEvents: "none",
  },
  "& .MuiSelect-select": {
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiSelect-iconOpen": {
    transform: "translateY(-50%) rotate(180deg)",
    transition: "transform 0.2s ease",
  },
  // when the select is focused/opened, make the outline and icon primary
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000093",
      borderWidth: "1px",
    },
    "& .MuiSelect-icon": {
      color: "#000093",
    },
    "& .MuiSelect-select": {
      color: "#000093",
    },
  },
  // when the select has a selected value, show selected styling
  "&.selected": {
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000093",
        borderWidth: "1px",
      },
      "& .MuiSelect-icon": {
        color: "#000093",
      },
      "& .MuiSelect-select": {
        color: "#000093",
      },
    },
  },
  // when the select dropdown is open, show selected styling too
  "&.open": {
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000093",
        borderWidth: "1px",
      },
      "& .MuiSelect-icon": {
        color: "#000093",
      },
      "& .MuiSelect-select": {
        color: "#000093",
      },
    },
  },
  // style the dropdown list (listbox) inside the Menu popover
  "& .MuiMenu-list, & .MuiList-root.MuiMenu-list": {
    padding: "4px 8px",
    boxSizing: "border-box",
    maxHeight: "320px",
    overflowY: "auto",
  },

  // ensure the paper that contains the menu has no unexpected padding
  "& .MuiPaper-root": {
    padding: 0,
  },

}));