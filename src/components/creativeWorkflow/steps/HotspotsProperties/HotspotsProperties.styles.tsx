import styled from "styled-components";
import { Box, Paper, Button, Tabs } from "@mui/material";

/* Page Layout */
export const PageWrapper = styled(Box)`
  display: flex;
  gap: 16px;
`;

/* Left Main Section */
export const MainSection = styled(Paper)`
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;

  user-drag: none; /* ✅ Prevent image drag ghost */
  -webkit-user-drag: none;
  user-select: none;
`;
/* Right Sidebar */
export const Sidebar = styled(Paper)`
  width: 300px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 16px;
  background: #ffffff;
`;

/* Footer */
export const Footer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const PrimaryButton = styled(Button)`
  borderRadius: 24,
  padding: "10px 24px",
  textTransform: "none",
  fontWeight: 600,
  backgroundColor: "#3535F3",
`;
/* Top Header Container */
export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
`;
export const SidebarContainer = styled(Box)`
  width: 360px;
  background: #f9fafb;
  border-left: 1px solid #e5e7eb;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

/* ============================= */
/* TABS */
/* ============================= */

export const StyledTabs = styled(Tabs)`
  margin-bottom: 16px;

  .MuiTabs-indicator {
    background-color: #4f46e5;
    height: 2px;
  }

  .MuiTab-root {
    text-transform: none;
    font-weight: 500;
    font-size: 14px;
  }

  .Mui-selected {
    color: #4f46e5 !important;
    font-weight: 600;
  }
`;

/* ============================= */
/* HOTSPOT CARD */
/* ============================= */

export const HotspotCard = styled(Box)(() => ({
  background: "#F3F4F6",
  borderRadius: 12,
  padding: "16px",
  marginBottom: "16px",
  position: "relative",
}));
/* Title */
export const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

/* Instruction Toast */
export const InstructionToast = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #eef2f7;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 700;
  color: #595959;
`;

/* Add Hotspot Button */
export const AddHotspotButton = styled(Button)`
  text-transform: none !important;
  border-radius: 20px !important;
  border: 1px solid #e0e0e0 !important;
  color: #000093 !important;
  font-weight: 700 !important;

  &:hover {
    background: rgba(79, 70, 229, 0.08) !important;
  }
  &.Mui-disabled {
    color: #9ca3af !important; /* grey text */
    border: 1px solid #e5e7eb !important; /* light border */
    background: #f3f4f6 !important; /* light grey background */
    cursor: not-allowed !important;
  }
`;
export const HotspotCanvasContainer = styled(Box)(({ theme }) => ({
  marginTop: "16px",
  padding: "16px",
  borderRadius: 12,
  border: "1px solid #E5E7EB",
  backgroundColor: "#F3F4F6",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}));
