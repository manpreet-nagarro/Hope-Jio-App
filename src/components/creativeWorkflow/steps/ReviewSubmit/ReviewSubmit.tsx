import React, { useState } from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "@store/creativeSlice/creativeSlice";
import type { RootState } from "@store/store";
import SendForReviewDialog from "./SendForReviewDialog";
import CheckIcon from "@mui/icons-material/Check";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import {
  Wrapper,
  PreviewContainer,
  PreviewInner,
  StyledImage,
  Footer,
  ChecklistItem,
  ChecklistContainer,
} from "./ReviewSubmit.styles";
import CheckItemIcon from "@assets/icons-svg/creativeWorkspace/checkItemIcon";

const ReviewSubmit = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const link = useSelector((state: RootState) => state.stepper.link);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSend = (selectedUser: string) => {
    setIsSubmitted(true); // ✅ mark as submitted
    setOpenDialog(false);
  };

  return (
    <>
      <Wrapper elevation={0} sx={{ margin: "0 10%" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
              Review & Submit for Approval
            </Typography>

            {isSubmitted && (
              <Chip
                icon={<CheckIcon sx={{ color: "#fff !important" }} />}
                label="Sent for Approval"
                sx={{
                  backgroundColor: "#22C55E",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        </Box>

        {/* Preview Section */}
        <PreviewContainer>
          <PreviewInner>
            <StyledImage src={link} alt="Preview Banner" />
          </PreviewInner>
        </PreviewContainer>
        <ChecklistContainer>
          <ChecklistItem>
            <CheckItemIcon />
            Please make sure all the required hotspots are added and working
            fine.
          </ChecklistItem>

          <ChecklistItem>
            <CheckItemIcon />
            All the required elements such as Brand Logo, imagery, CTA and
            Messaging has placed appropriately.
          </ChecklistItem>
        </ChecklistContainer>

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
            disabled={isSubmitted}
            onClick={() => setOpenDialog(true)}
          >
            Submit for Approval
          </Button>
        </Footer>
      </Wrapper>
      {/* Popup Dialog */}
      <SendForReviewDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSend={handleSend}
      />
    </>
  );
};

export default ReviewSubmit;
