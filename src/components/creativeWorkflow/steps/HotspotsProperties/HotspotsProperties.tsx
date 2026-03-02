import { useState, useEffect } from "react";
import { Box, Typography, TextField, Tab, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
} from "./HotspotsProperties.styles";

import CloseIcon from "@mui/icons-material/Close";
import HotspotToastIcon from "@assets/icons-svg/creativeWorkspace/hotSpotToastIcon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { nextStep, prevStep } from "@store/creativeSlice/creativeSlice";

export default function Hotspots() {
  const dispatch = useDispatch();
  const link = useSelector((state: RootState) => state.stepper.link);
  const urls = useSelector((state: RootState) => state.stepper.urls);

  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [placementIndex, setPlacementIndex] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(true);
  const [isPlacing, setIsPlacing] = useState(false);
  const hasUnplacedHotspot = hotspots.some((h) => !h.placed);

  // Initialize hotspots based on URL count when component mounts
  useEffect(() => {
    const initialHotspots: Hotspot[] = urls.map((_, index) => ({
      id: index,
      x: null,
      y: null,
      width: null,
      height: null,
      url: "",
      altText: "",
      placed: false,
    }));
    setHotspots(initialHotspots);
  }, [urls]);

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
    if (isPlacing) return;

    const firstUnplacedIndex = hotspots.findIndex((h) => !h.placed);
    if (firstUnplacedIndex === -1) return;

    const boxWidth = 150;
    const boxHeight = 150;
    const gap = 20;

    let foundPosition = { x: 50, y: 50 };

    const canvasWidth = 800; // fallback width
    const canvasHeight = 600; // fallback height

    outerLoop: for (
      let y = gap;
      y < canvasHeight - boxHeight;
      y += boxHeight + gap
    ) {
      for (let x = gap; x < canvasWidth - boxWidth; x += boxWidth + gap) {
        const newRect = { x, y, width: boxWidth, height: boxHeight };

        const overlap = hotspots.some((spot) => {
          if (
            spot.x === null ||
            spot.y === null ||
            spot.width === null ||
            spot.height === null
          ) {
            return false;
          }

          return !(
            newRect.x + newRect.width <= spot.x ||
            spot.x + spot.width <= newRect.x ||
            newRect.y + newRect.height <= spot.y ||
            spot.y + spot.height <= newRect.y
          );
        });

        if (!overlap) {
          foundPosition = { x, y };
          break outerLoop;
        }
      }
    }

    setPlacementIndex(firstUnplacedIndex);
    setIsPlacing(true);

    setHotspots((prev) =>
      prev.map((spot, index) =>
        index === firstUnplacedIndex
          ? {
              ...spot,
              x: foundPosition.x,
              y: foundPosition.y,
              width: boxWidth,
              height: boxHeight,
            }
          : spot,
      ),
    );
  };

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
            disabled={!hasUnplacedHotspot}
          >
            Add Hotspot
          </AddHotspotButton>
        </HeaderContainer>

        <HotspotCanvasContainer>
          <HotspotCanvas
            imageUrl={link}
            hotspots={hotspots}
            setHotspots={setHotspots}
            placementIndex={placementIndex}
            setPlacementIndex={setPlacementIndex}
            setIsPlacing={setIsPlacing}
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
        <StyledTabs value={0} variant="fullWidth">
          <Tab label="Hotspots" />
          <Tab label="Properties" />
        </StyledTabs>

        {hotspots.map((spot, index) => (
          <HotspotCard key={spot.id}>
            <Typography fontWeight={600}>
              Hotspot {index + 1}
              {!spot.placed && (
                <span style={{ color: "red", marginLeft: 8 }}>Not Placed</span>
              )}
            </Typography>

            <TextField
              fullWidth
              size="small"
              label="Hotspot URL"
              value={spot.url}
              onChange={(e) =>
                setHotspots((prev) =>
                  prev.map((h, i) =>
                    i === index ? { ...h, url: e.target.value } : h,
                  ),
                )
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              size="small"
              label="Alt Text"
              value={spot.altText}
              onChange={(e) =>
                setHotspots((prev) =>
                  prev.map((h, i) =>
                    i === index ? { ...h, altText: e.target.value } : h,
                  ),
                )
              }
            />
          </HotspotCard>
        ))}
      </SidebarContainer>
    </Box>
  );
}
