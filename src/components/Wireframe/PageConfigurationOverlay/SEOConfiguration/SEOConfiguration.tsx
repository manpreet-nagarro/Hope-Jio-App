import { Box } from "@mui/material";
import { SEOTitleAccordion } from "./SEOTitleAccordion";
import { SEODescriptionAccordion } from "./SEODescriptionAccordion";
import { CanonicalURLField } from "./CanonicalURLField";
import { SEOMetaDescriptionAccordion } from "./SEOMetaDescriptionAccordion";
import { SEOPageTitleAccordion } from "./SEOPageTitleAccordion";
import { SEOMataKeywordsAccordion } from "./SEOMetaKeywordsAccordion";
import { FiltersAndCategoriesAccordion } from "./FiltersAndCategoriesAccordion";

export const SEOConfiguration = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
      <SEOTitleAccordion />
      <SEOPageTitleAccordion />
      <CanonicalURLField />
      <SEOMetaDescriptionAccordion />
      <SEOMataKeywordsAccordion />
      <SEODescriptionAccordion />
      <FiltersAndCategoriesAccordion />
    </Box>
  );
};
