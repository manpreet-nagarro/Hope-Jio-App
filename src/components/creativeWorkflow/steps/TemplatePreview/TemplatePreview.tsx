import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setLink,
  prevStep,
} from "@store/creativeSlice/creativeSlice";
import type { RootState } from "@store/store";
import { useToast } from "@hooks/useToast";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import {
  Wrapper,
  PreviewContainer,
  PreviewInner,
  PlaceholderBox,
  StyledImage,
  Footer,
} from "./TemplatePreview.styles";
import ImageKitIcon from "@assets/icons-svg/creativeWorkspace/imageKitIcon";
import LinkIcon from "@assets/icons-svg/creativeWorkspace/linkIcon";
import PreviewIcon from "@assets/icons-svg/creativeWorkspace/previewIcon";
import CloseUrlIcon from "@assets/icons-svg/creativeWorkspace/closeIcon";

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
    <Wrapper elevation={0} sx={{ margin: "0 10%" }}>
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
          endIcon={<ImageKitIcon />}
          sx={{ textTransform: "none", color: "#141414", fontWeight: 500 }}
        >
          Open ImageKit
        </Button>
      </Box>

      {/* URL Input */}
      <TextField
        fullWidth
        size="small"
        placeholder="Create the Template in ImageKit and paste the URL Here"
        value={link}
        sx={{
          backgroundColor: "#F8F8F8",
          border: "1px solid #E0E0E0",
          "&:hover": { borderColor: "#B5B5B5" },
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        }}
        onChange={handleLinkChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkIcon />
            </InputAdornment>
          ),
          endAdornment: link ? (
            <InputAdornment position="end">
              <CloseUrlIcon onClick={() => handleClearLink()} />
            </InputAdornment>
          ) : null,
        }}
      />

      {/* Preview Section */}
      <PreviewContainer>
        <PreviewInner>
          {!link ? (
            <PlaceholderBox>
              <PreviewIcon size={64} />
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
        </PreviewInner>
      </PreviewContainer>

      {/* Footer */}
      <Footer>
        <Button
          variant="text"
          sx={{ textTransform: "none", color: "#000" }}
          startIcon={<ChevronLeftIcon />}
          onClick={() => dispatch(prevStep())}
        >
          Back
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
            "&:disabled": {
              backgroundColor: "#4338CA",
              opacity: "0.3",
              color: "#fff",
            },
          }}
          endIcon={<ChevronRightIcon />}
          onClick={() => dispatch(nextStep())}
        >
          {link && !imageError
            ? "Save & Continue to Hotspots"
            : "Continue to hotspots"}
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default TemplatePreview;
