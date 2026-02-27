import { useState, useEffect } from "react";
import { Box, Typography, TextField, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import type { RootState } from "@store/store";
import type { Hotspot } from "./hotspot.types";
import HotspotCanvas from "./HotSpotCanvas";
import {
  AddHotspotButton,
  HotspotCard,
  SidebarContainer,
  StyledTabs,
} from "./HotspotsProperties.styles";

export default function Hotspots() {
  const link = useSelector((state: RootState) => state.stepper.link);
  const urls = useSelector((state: RootState) => state.stepper.urls);

  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [placementIndex, setPlacementIndex] = useState<number | null>(null);

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
    // Find the first unplaced hotspot and set it for placement
    const firstUnplacedIndex = hotspots.findIndex((h) => !h.placed);

    if (firstUnplacedIndex !== -1) {
      // If there's an unplaced hotspot, start placing it
      setPlacementIndex(firstUnplacedIndex);
      // Initialize the hotspot with default size at center
      setHotspots((prev) =>
        prev.map((spot, index) =>
          index === firstUnplacedIndex
            ? {
                ...spot,
                x: 50,
                y: 50,
                width: 20,
                height: 20,
              }
            : spot,
        ),
      );
    }
  };

  return (
    <Box display="flex" gap={2}>
      {/* LEFT SIDE */}
      <Box flex={1}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography fontWeight={600}>Hotspots & Properties</Typography>

          <AddHotspotButton
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddHotspot}
            disabled={placementIndex !== null}
          >
            Add Hotspot
          </AddHotspotButton>
        </Box>

        <HotspotCanvas
          imageUrl={link}
          hotspots={hotspots}
          setHotspots={setHotspots}
          placementIndex={placementIndex}
          setPlacementIndex={setPlacementIndex}
        />
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
