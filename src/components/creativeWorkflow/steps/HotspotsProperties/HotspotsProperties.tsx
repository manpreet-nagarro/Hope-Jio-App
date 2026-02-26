import React, { useState } from "react";
import { Typography, Button, Tabs, Tab, TextField, Box } from "@mui/material";

import {
  PageWrapper,
  MainSection,
  PreviewContainer,
  ImageWrapper,
  StyledImage,
  Sidebar,
  Footer,
  PrimaryButton,
} from "./HotspotsProperties.styles";

import { useSelector } from "react-redux";
import type { RootState } from "@store/store";

export default function Hotspots() {
  const link = useSelector((state: RootState) => state.stepper.link);
  const [tab, setTab] = useState(0);

  return (
    <PageWrapper>
      {/* LEFT SIDE */}
      <MainSection elevation={0}>
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={600}>Hotspots & Properties</Typography>
        </Box>

        <PreviewContainer>
          <ImageWrapper>
            {link ? (
              <StyledImage src={link} alt="Preview" />
            ) : (
              <Typography color="textSecondary">
                No template image available
              </Typography>
            )}
          </ImageWrapper>
        </PreviewContainer>

        <Footer>
          <Button variant="text">← Back</Button>
          <PrimaryButton variant="contained">
            Save, Review & Submit →
          </PrimaryButton>
        </Footer>
      </MainSection>

      {/* RIGHT SIDEBAR */}
      <Sidebar elevation={0}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="Hotspots" />
          <Tab label="Properties" />
        </Tabs>

        {tab === 0 && (
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              Hotspot 1
            </Typography>

            <TextField
              fullWidth
              size="small"
              label="Hotspot URL"
              placeholder="Select"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              size="small"
              label="Alt Text"
              placeholder="New Hotspot"
            />
          </Box>
        )}

        {tab === 1 && (
          <Box mt={2}>
            <Typography variant="body2">
              Properties panel content here...
            </Typography>
          </Box>
        )}
      </Sidebar>
    </PageWrapper>
  );
}
