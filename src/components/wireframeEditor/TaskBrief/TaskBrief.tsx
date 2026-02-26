import { useState } from "react";
import { Box } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useOptionalTaskWorkflow } from "../TaskWorkflow/TaskWorkflow";

import {
  Container,
  Section,
  FieldBlock,
  Label,
  Value,
  DividerLine,
  LinkText,
  UrlDropdown,
  CTAButton,
} from "./TaskBrief.styles";

interface Props {
  onContinue?: () => void;
}

export default function TaskBrief({ onContinue }: Props) {
  const [showUrls, setShowUrls] = useState(false);
  const workflow = useOptionalTaskWorkflow();

  const urls = [
    "https://ajio.com/winter-collection-desk",
    "https://ajio.com/kids-shoes",
    "https://ajio.com/summer-things",
  ];

  return (
    <Box>
      <Container>
        <Value sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
          Task Brief - Component Details
        </Value>

        {/* Top Section */}
        <Section>
          <FieldBlock>
            <Label>Slot/Component Type</Label>
            <Value>Dynamic Banner</Value>
          </FieldBlock>

          <FieldBlock>
            <Label>Banner Type</Label>
            <Value>13.33 x 3.33 Landscape-1</Value>
          </FieldBlock>

          <FieldBlock>
            <Label>Slot/Component ID</Label>
            <Value>S1/S3</Value>
          </FieldBlock>

          <FieldBlock>
            <Label>Wireframe Page</Label>
            <Value>Diwali Sale Homepage</Value>
          </FieldBlock>
        </Section>

        <DividerLine />

        {/* Messaging Guidance */}
        <Section>
          <FieldBlock>
            <Label>Slot Level Message</Label>
            <Value>Winter Collection Up To 50% Off</Value>
          </FieldBlock>

          <FieldBlock>
            <Label>Component Level Message / CTA</Label>
            <Value>Up to 70% Off on Fashion & Lifestyle - CTA: Shop Now</Value>
          </FieldBlock>
        </Section>

        <DividerLine />

        {/* Other Info */}
        <FieldBlock>
          <Label>Curated URLs</Label>

          <LinkText
            role="button"
            aria-label="View curated URLs"
            onClick={() => setShowUrls(!showUrls)}
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
      </Container>

      {/* CTA */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <CTAButton
          variant="contained"
          endIcon={<ChevronRightIcon />}
          onClick={() => {
            if (onContinue) onContinue();
            else workflow?.setActiveStep?.(1);
          }}
          aria-label="Continue to Template Preview"
        >
          Continue to Template Preview
        </CTAButton>
      </Box>
    </Box>
  );
}
