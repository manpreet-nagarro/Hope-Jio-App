import { useState } from "react";
import { Box } from "@mui/material";
import { StyledTabs, StyledTab } from "./PageInfoTabs.styles";
import { GeneralInformation } from "./GeneralInformation";
import { SEOConfiguration } from "./SEOConfiguration";

export const PageInfoTabs = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <StyledTabs
        value={tab}
        onChange={(_, value) => setTab(value)}
      >
        <StyledTab label="General Information" />
        <StyledTab label="SEO Configuration" />
      </StyledTabs>

      <Box flex={1} p={2}>
        {tab === 0 && <GeneralInformation />}
        {tab === 1 && <SEOConfiguration />}
      </Box>
    </>
  );
};
