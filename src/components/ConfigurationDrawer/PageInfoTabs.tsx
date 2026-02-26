import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { setConfigurationActiveTab } from "@store/UISlice/UISlice";
import { Box } from "@mui/material";
import { StyledTabs, StyledTab } from "./PageInfoTabs.styles";
import { SlotConfiguration } from "./SlotConfiguration/SlotConfiguration";
import { ComponentsConfiguration } from "./ComponentsConfiguration/ComponentsConfiguration";

export const PageInfoTabs = () => {
  const dispatch = useDispatch();
  const tab = useSelector(
    (state: RootState) => state.ui.configurationActiveTab
  );

  return (
    <>
      <StyledTabs
        value={tab}
        onChange={(_, value) =>
          dispatch(setConfigurationActiveTab(value))
        }
      >
        <StyledTab label="Slot" />
        <StyledTab label="Components" />
      </StyledTabs>

      <Box flex={1} p={2}>
        {tab === 0 && <SlotConfiguration />}
        {tab === 1 && <ComponentsConfiguration />}
      </Box>
    </>
  );
};
