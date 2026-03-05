import { useState } from "react";
import { useDispatch } from "react-redux";
import { nextStep, setUrls } from "@store/creativeSlice/creativeSlice";

import { Typography, Divider, Box } from "@mui/material";
import {
  FieldBlock,
  Label,
  LinkText,
  UrlDropdown,
  Value,
  CTAButton,
  DetailsGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
} from "./TaskBrief.styles";
import LinkIcon from "@mui/icons-material/Link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BannerIcon from "@assets/icons-svg/creativeWorkspace/bannerIcon";
import BannerTypeIcon from "@assets/icons-svg/creativeWorkspace/bannerTypeIcon";
import ComponentIdIcon from "@assets/icons-svg/creativeWorkspace/componentIdIcon";
import WireframePageIcon from "@assets/icons-svg/creativeWorkspace/wireframePageIcon";
import MessageGuidanceIcon from "@assets/icons-svg/creativeWorkspace/MessageGuidanceIcon";
import OtherInfoIcon from "@assets/icons-svg/creativeWorkspace/otherInfoIcon";

interface TaskBriefProps {
  isReadOnly?: boolean;
}

export default function TaskBrief({ isReadOnly = false }: TaskBriefProps) {
  const [showUrls, setShowUrls] = useState(false);
  const urls = [
    "https://ajio.com/winter-collection-desk",
    "https://ajio.com/kids-shoes",
    "https://ajio.com/summer-things",
  ];
  const dispatch = useDispatch();

  const handleProceed = () => {
    dispatch(nextStep());
  };
  dispatch(setUrls(urls));
  return (
    <>
      <Box
        sx={{ backgroundColor: "#fff", padding: "30px 40px", margin: "0 10%" }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Task Brief - Component Details
        </Typography>

        <DetailsGrid>
          <DetailItem>
            <DetailLabel>
              <BannerIcon />
              Slot/Component Type
            </DetailLabel>
            <DetailValue>Dynamic Banner</DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>
              <BannerTypeIcon />
              Banner Type
            </DetailLabel>
            <DetailValue>Wide Hero Landscape-1</DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>
              <ComponentIdIcon />
              Slot/Component ID
            </DetailLabel>
            <DetailValue>S1/C3</DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>
              <WireframePageIcon />
              Wireframe Page
            </DetailLabel>
            <DetailValue>Diwali Sale Homepage</DetailValue>
          </DetailItem>
        </DetailsGrid>

        <Divider sx={{ my: 2 }} />
        <Label sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <MessageGuidanceIcon height={16} width={16} /> Messaging Guidance
        </Label>
        <DetailsGrid>
          <DetailItem>
            <DetailLabel>Slot Level Message</DetailLabel>
            <DetailValue sx={{ marginLeft: "0" }}>
              Winter Collection Up To 50% Off
            </DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>Component Level Message/Call Out/CTA</DetailLabel>
            <DetailValue sx={{ marginLeft: "0" }}>
              Up to 70% Off on Fashion & Lifestyle - CTA:shop now
            </DetailValue>
          </DetailItem>
        </DetailsGrid>

        <Divider sx={{ my: 2 }} />
        <Label sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <OtherInfoIcon height={16} width={16} />
          Other Info
        </Label>
        <FieldBlock sx={{ position: "relative" }}>
          <Label>Curated URLs</Label>

          <LinkText
            role="button"
            aria-label="View curated URLs"
            onClick={() => !isReadOnly && setShowUrls(!showUrls)}
            sx={{
              width: "fit-content",
              cursor: isReadOnly ? "not-allowed" : "pointer",
              opacity: isReadOnly ? 0.6 : 1,
            }}
          >
            <LinkIcon fontSize="small" />
            View Curated URLs (3)
          </LinkText>

          {showUrls && (
            <UrlDropdown>
              {urls.map((url) => (
                <Box
                  key={url}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <LinkIcon fontSize="small" />
                  <Value sx={{ fontSize: 13 }}>{url}</Value>
                </Box>
              ))}
            </UrlDropdown>
          )}
        </FieldBlock>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <CTAButton
          variant="contained"
          endIcon={<ChevronRightIcon />}
          onClick={handleProceed}
          aria-label="Continue to Template Preview"
        >
          Continue to Template Preview
        </CTAButton>
      </Box>
    </>
  );
}
