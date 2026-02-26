import { styled as MuiStyled} from "@mui/material/styles";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { COLORS, FONTS } from "@constants/theme.constants";

export const SecondaryActionButton = MuiStyled(Button)(() => ({
    borderRadius: '1000px',
    padding: "12px 16px",
    color: "#000093",
    border: "1px solid #E0E0E0",
}))

export const PrimaryActionButton = MuiStyled(Button)(({ color }) => ({
    borderRadius: '1000px',
    padding: "12px 16px",
    backgroundColor: color === "error" ? COLORS.TEXT_DANGER_SECONDARY : COLORS.ACCENT_PRIMARY,
    color: "#FFFFFF",
    gap: '8px',
    border: `1px solid ${color === "error" ? COLORS.TEXT_DANGER_SECONDARY : COLORS.ACCENT_PRIMARY}`,
}))

export const ConfirmDialog = MuiStyled(Dialog)(() => ({
    borderRadius: '16px'
}))

export const StyledDialogContent = MuiStyled(DialogContent)(() => ({
    padding: "8px 24px",
}))

export const ConfirmDialogActions = MuiStyled(DialogActions)(() => ({
    paddingBottom: '16px',
    paddingRight: '16px',
    borderTop: '1px solid #E7E7E7',
}))

export const DialogHeader = MuiStyled(Box)(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
}))

export const StyledDialogTitle = MuiStyled(DialogTitle)(() => ({
    fontFamily: FONTS.FONT_FAMILY_BOLD,
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0%',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    textAlign:"center"
}))

export const StyledDialogMessage = MuiStyled(Box)(() => ({
    fontFamily: FONTS.FONT_FAMILY_LIGHT,
    fontSize: '1rem',
    lineHeight: '24px',
    letterSpacing: '0%',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '20px',
}))



