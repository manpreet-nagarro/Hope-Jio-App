import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { setLink } from "@store/creativeSlice/creativeSlice";
import type { RootState } from "@store/store";
import { useToast } from "@hooks/useToast";

import {
  Wrapper,
  PreviewContainer,
  PlaceholderBox,
  StyledImage,
  Footer,
} from "./TemplatePreview.styles";

const TemplatePreview = () => {
  const dispatch = useDispatch();
  const link = useSelector((state: RootState) => state.stepper.link);
  const { show } = useToast();
  const [imageError, setImageError] = useState(false);

  const handleOpenGoogle = () => {
    window.open("https://www.google.com", "_blank");
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLink(e.target.value));
    setImageError(false);
  };

  const handleClearLink = () => {
    dispatch(setLink(""));
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    show({
      message: "Failed to load image. Please check the URL and try again.",
      severity: "error",
    });
  };

  return (
    <Wrapper elevation={0}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontWeight={600}>Template Preview</Typography>
        <Button
          variant="text"
          size="small"
          onClick={handleOpenGoogle}
          endIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17H17V7H7V17Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 4H20V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 14L20 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          sx={{ textTransform: "none", color: "#3535F3" }}
        >
          Open ImageKit
        </Button>
      </Box>

      {/* URL Input */}
      <TextField
        fullWidth
        size="small"
        placeholder="Paste ImageKit URL here"
        value={link}
        onChange={handleLinkChange}
        InputProps={{
          endAdornment: link ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClearLink}
                edge="end"
                sx={{ p: 0.5 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      {/* Preview Section */}
      <PreviewContainer onClick={handleOpenGoogle}>
        {!link ? (
          <PlaceholderBox>
            <Typography variant="subtitle1" fontWeight={500}>
              Template Preview
            </Typography>
            <Typography variant="body2">
              Sample generated on ImageKit will be shown here
            </Typography>
          </PlaceholderBox>
        ) : imageError ? (
          <PlaceholderBox>
            <Typography variant="subtitle1" fontWeight={500} color="error">
              Failed to Load Image
            </Typography>
            <Typography variant="body2" color="error">
              The image URL is broken. Please check the URL.
            </Typography>
          </PlaceholderBox>
        ) : (
          <StyledImage
            src={link}
            alt="Preview Banner"
            onError={handleImageError}
          />
        )}
      </PreviewContainer>

      {/* Footer */}
      <Footer>
        <Button variant="text" sx={{ textTransform: "none" }}>
          ← Back
        </Button>

        <Button
          variant="contained"
          disabled={!link || imageError}
          sx={{
            textTransform: "none",
            borderRadius: 20,
            px: 3,
            backgroundColor: "#4F46E5",
            "&:hover": { backgroundColor: "#4338CA" },
            "&:disabled": { backgroundColor: "#D1D5DB", color: "#6B7280" },
          }}
        >
          {link && !imageError ? "Save and review" : "Continue to hotspots"}
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default TemplatePreview;
