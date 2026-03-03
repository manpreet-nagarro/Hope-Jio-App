import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Tab,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@store/store";
import type { Hotspot } from "./hotspot.types";
import HotspotCanvas from "./HotSpotCanvas";
import {
  AddHotspotButton,
  HotspotCard,
  SidebarContainer,
  StyledTabs,
  HeaderContainer,
  HeaderTitle,
  InstructionToast,
  HotspotCanvasContainer,
  Footer,
  TabContentWrapper,
} from "./HotspotsProperties.styles";

import CloseIcon from "@mui/icons-material/Close";
import HotspotToastIcon from "@assets/icons-svg/creativeWorkspace/hotSpotToastIcon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  nextStep,
  prevStep,
  setHotspots,
} from "@store/creativeSlice/creativeSlice";

export default function Hotspots() {
  const dispatch = useDispatch();
  const link = useSelector((state: RootState) => state.stepper.link);
  const urls = useSelector((state: RootState) => state.stepper.urls);

  const [placementIndex, setPlacementIndex] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(true);
  const [isPlacing, setIsPlacing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const hotspots = useSelector((state: RootState) => state.stepper.hotspots);

  // Track which hotspots are created (placed)
  const placedHotspotsCount = hotspots.filter((h) => h.placed).length;
  const canAddMoreHotspots = placedHotspotsCount < urls.length && !isPlacing;
  const isSaveButtonEnabled = placedHotspotsCount > 0;

  // Initialize with first hotspot section on load
  useEffect(() => {
    if (urls.length > 0 && hotspots.length === 0) {
      // Create first hotspot info section (not placed yet)
      const firstHotspot: Hotspot = {
        id: 0,
        x: null,
        y: null,
        width: null,
        height: null,
        url: "",
        altText: "",
        placed: false,
      };
      dispatch(setHotspots([firstHotspot]));
    }
  }, [urls, hotspots.length, dispatch]);

  // Log hotspot to URL mapping whenever hotspots change
  useEffect(() => {
    console.log("=== HOTSPOT MAPPING ===");
    hotspots.forEach((spot, index) => {
      console.log(`Hotspot ${index + 1}:`, {
        position: spot.x !== null ? `(${spot.x}, ${spot.y})` : "Not placed",
        size: spot.width ? `${spot.width}x${spot.height}` : "N/A",
        url: spot.url || "(empty)",
        altText: spot.altText || "(empty)",
        placed: spot.placed,
      });
    });
    console.log("=======================");
  }, [hotspots]);

  const handleAddHotspot = () => {
    const boxWidth = 150;
    const boxHeight = 150;
    const baseX = 50;
    const baseY = 50;
    const gap = 20; // 👈 control spacing here

    // If first hotspot exists but not placed → place it
    if (hotspots.length === 1 && !hotspots[0].placed) {
      const updated = hotspots.map((spot) => ({
        ...spot,
        x: baseX,
        y: baseY,
        width: boxWidth,
        height: boxHeight,
        placed: true,
      }));

      dispatch(setHotspots(updated));
      return;
    }

    if (!canAddMoreHotspots) return;

    const index = hotspots.length;

    const newHotspot: Hotspot = {
      id: Date.now(),
      x: baseX + index * (boxWidth + gap),
      y: baseY,
      width: boxWidth,
      height: boxHeight,
      url: "",
      altText: "",
      placed: true,
    };

    dispatch(setHotspots([...hotspots, newHotspot]));
  };
  const handleDeleteHotspot = (hotspotId: number) => {
    if (hotspots.length <= 1) {
      alert("At least one hotspot is mandatory");
      return;
    }

    const updated = hotspots.filter((spot) => spot.id !== hotspotId);
    dispatch(setHotspots(updated));

    if (placementIndex !== null) {
      setPlacementIndex(null);
      setIsPlacing(false);
    }
  };
  // Only consider placed hotspots
  const placedHotspots = hotspots.filter((h) => h.placed);

  // Check if at least one hotspot exists
  const hasAtLeastOneHotspot = placedHotspots.length > 0;

  // Check if any placed hotspot has empty URL
  const hasEmptyUrl = placedHotspots.some((h) => !h.url);

  // Final Save button state
  const isSaveEnabled = hasAtLeastOneHotspot && !hasEmptyUrl;
  return (
    <Box display="flex" gap={2}>
      {/* LEFT SIDE */}
      <Box flex={1}>
        <HeaderContainer>
          <HeaderTitle>Hotspots & Properties</HeaderTitle>

          {showToast && (
            <InstructionToast>
              <HotspotToastIcon />
              Click 'Add Hotspot' and then move/resize the box to select the
              target area.
              <CloseIcon
                sx={{ cursor: "pointer", fontSize: "14px" }}
                onClick={() => setShowToast(false)}
              />
            </InstructionToast>
          )}
          <AddHotspotButton
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddHotspot}
            disabled={!canAddMoreHotspots}
          >
            Add Hotspot
          </AddHotspotButton>
        </HeaderContainer>

        <HotspotCanvasContainer>
          <HotspotCanvas
            imageUrl={link}
            hotspots={hotspots}
            setHotspots={(updatedHotspots) => {
              dispatch(setHotspots(updatedHotspots));
            }}
            placementIndex={placementIndex}
            setPlacementIndex={setPlacementIndex}
            setIsPlacing={setIsPlacing}
            onDeleteHotspot={handleDeleteHotspot}
          />
        </HotspotCanvasContainer>
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
            disabled={!isSaveEnabled}
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
            Save,Review & Submit
          </Button>
        </Footer>
      </Box>

      <SidebarContainer>
        <StyledTabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label="Hotspots" />
          <Tab label="Properties" />
        </StyledTabs>
        <TabContentWrapper>
          {tabValue === 0 ? (
            hotspots.map((spot, index) => (
              <Box key={spot.id} mb={2}>
                {/* Section Label with Index Badge */}
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography fontSize={14} fontWeight={600}>
                    Hotspots
                  </Typography>

                  <Box
                    sx={{
                      backgroundColor: "#E5E7EB",
                      borderRadius: "999px",
                      height: 20,
                      minWidth: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {index + 1}
                  </Box>
                </Box>

                <HotspotCard>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontSize={14} fontWeight={600}>
                      Hotspot {index + 1}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => handleDeleteHotspot(spot.id)}
                      disabled={hotspots.length === 1}
                      sx={{ padding: 0.5 }}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>

                  {/* URL Dropdown */}
                  <TextField
                    select
                    fullWidth
                    variant="standard"
                    size="small"
                    label="Hotspot URL"
                    required
                    value={spot.url || ""}
                    onChange={(e) => {
                      const updated = hotspots.map((h) =>
                        h.id === spot.id ? { ...h, url: e.target.value } : h,
                      );
                      dispatch(setHotspots(updated));
                    }}
                    SelectProps={{ displayEmpty: true }}
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      },
                    }}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>

                    {urls.map((urlValue) => {
                      const selectedUrls = hotspots
                        .filter((h) => h.id !== spot.id)
                        .map((h) => h.url);

                      const isDisabled = selectedUrls.includes(urlValue);

                      return (
                        <MenuItem
                          key={urlValue}
                          value={urlValue}
                          disabled={isDisabled}
                        >
                          {urlValue}
                        </MenuItem>
                      );
                    })}
                  </TextField>

                  {/* Alt Text */}
                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    label="Alt Text"
                    placeholder="New Hotspot"
                    value={spot.altText || ""}
                    onChange={(e) => {
                      const updated = hotspots.map((h) =>
                        h.id === spot.id
                          ? { ...h, altText: e.target.value }
                          : h,
                      );
                      dispatch(setHotspots(updated));
                    }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 1 }}
                  />
                </HotspotCard>
              </Box>
            ))
          ) : (
            <Box p={2}>
              <Typography fontSize={14} fontWeight={500}>
                Property Tab displaying
              </Typography>
            </Box>
          )}
        </TabContentWrapper>
      </SidebarContainer>
    </Box>
  );
}
