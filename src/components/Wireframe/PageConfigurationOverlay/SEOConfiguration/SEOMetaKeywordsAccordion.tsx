import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { PageInfoFormValues } from "../schema/pageInfo.schema";
import { StyledAccordion } from "../PageInfoTabs.styles";
import { usePrivilege } from "@hooks/usePrivilege";

export const SEOMataKeywordsAccordion = () => {
  const { control } = useFormContext<PageInfoFormValues>();
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { canEditWireframeConfiguration } = usePrivilege();

  return (
    <StyledAccordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
    >
      <AccordionSummary
        expandIcon={
          <Box sx={{ display: "flex", alignItems: "center", color: "#000093" }}>
            {expanded ? <RemoveIcon /> : <AddIcon />}
          </Box>
        }
      >
        <Box
          sx={{
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "20px",
            color: "#141414",
          }}
        >
          Meta Keywords
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={4}>
          <Box
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            Keywords
          </Box>

          <Controller
            name="seo.seoMetaKeywords"
            control={control}
            defaultValue={[]}
            render={({ field }) => {
              const keywords = field.value || [];

              const handleAddKeyword = () => {
                const trimmed = inputValue.trim();
                if (!trimmed || keywords.includes(trimmed)) return;

                field.onChange([...keywords, trimmed]);
                setInputValue("");
              };

              const handleDelete = (keyword: string) => {
                field.onChange(
                  keywords.filter((k: string) => k !== keyword),
                );
              };

              return (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 1,
                    borderBottom: "1px solid #000093",
                    pb: 1,
                  }}
                >
                  {/* Chips */}
                  {keywords.map((keyword: string) => (
                    <Chip
                      key={keyword}
                      label={keyword}
                      onDelete={() => handleDelete(keyword)}
                      deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
                      sx={{
                        backgroundColor: "rgba(158, 181, 250, 0.5)",
                        fontWeight: 500,
                        borderRadius: "16px",
                      }}
                    />
                  ))}

                  {/* Input */}
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder="Type and press Enter"
                    disabled={!canEditWireframeConfiguration}
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      flex: 1,
                      minWidth: "120px",
                      fontSize: "14px",
                    }}
                  />
                </Box>
              );
            }}
          />
        </Stack>
      </AccordionDetails>
    </StyledAccordion>
  );
};
