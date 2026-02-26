import styled from "styled-components";
import { Box, Paper, Button } from "@mui/material";

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

/* Image Preview Container */
export const PreviewContainer = styled(Box)`
  margin-top: 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  padding: 16px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Image Wrapper */
export const ImageWrapper = styled(Box)`
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16 / 9;
  background: #ededed;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Actual Image */
export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  background: #4f46e5 !important;
  color: white !important;
  border-radius: 20px !important;
  text-transform: none !important;

  &:hover {
    background: #4338ca !important;
  }
`;
