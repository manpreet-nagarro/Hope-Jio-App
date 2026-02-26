import {
  CardContent,
  CategoryTitle,
  CollapsedContainer,
  CollapsedLabel,
  ComponentCard,
  ComponentDrawer,
  ComponentLabel,
  DrawerHeader,
  GroupGrid,
  GroupHeader,
  IconBox,
  ScrollContainer,
  SearchWrapper,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from "./componentLibrary.styles";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { COMPONENT_LIBRARY } from "@utils/messages";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { toggleComponentLibrary } from "@store/UISlice/UISlice";
import InfoIcon from "@assets/icons-svg/componentLibrary/infoIcon";
import useComponentLibrary from "@hooks/useComponentLibrary";
import * as ComponentIcons from "@assets/icons-svg/componentLibrary";
import { urlToPascalCaseKey } from "@utils/commonUtils";
import { usePrivilege } from "@hooks/usePrivilege";
import type { ICategory, IComponentGroup, IComponentItem } from "src/interfaces/wireframeEditor";


const getIconComponent = (componentUrl: string): React.ComponentType | null => {
  const key = urlToPascalCaseKey(componentUrl);
  return (ComponentIcons as Record<string, React.ComponentType>)[key] || null;
};

const ComponentLibrary = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector(
    (state: RootState) => state.ui.isComponentLibraryCollapsed,
  );

  const {
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    filteredCategories,
    onDragStart,
  } = useComponentLibrary();

  /** is user allowed to drag or drop components */
  const { canComponentLibraryActionsEnabled } = usePrivilege();

  const renderComponentCard = (component: IComponentItem) => {
    const Icon = component.url ? getIconComponent(component.url) : null;
    return (
      <ComponentCard
        key={component.component_id}
        draggable={canComponentLibraryActionsEnabled}
        canDrag={canComponentLibraryActionsEnabled}
        onDragStart={canComponentLibraryActionsEnabled ? (e) => onDragStart(e, component.component_name, component) : undefined}
      >
        <CardContent>
          <div style={{ width: 97, height: 62, marginBottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {Icon ? <Icon /> : null}
          </div>
          <ComponentLabel>{component.component_name}</ComponentLabel>
        </CardContent>
      </ComponentCard>
    );
  };

  const renderComponentGroup = (group: IComponentGroup) => (
    <Box key={group.component_type}>
      <GroupHeader>
        <Typography fontSize={"0.75rem"}>{group.component_type}</Typography>
        <InfoIcon />
      </GroupHeader>
      <GroupGrid>{group.components.map(renderComponentCard)}</GroupGrid>
    </Box>
  );

  const renderCategory = (category: ICategory) => (
    <Box key={category.category_type}>
      <StyledAccordion key={category.category_type} defaultExpanded>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CategoryTitle>{category.category_type}</CategoryTitle>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          {category.component_groups.map(renderComponentGroup)}
        </StyledAccordionDetails>
      </StyledAccordion>
    </Box>
  );

  return (
    <ComponentDrawer variant="permanent" isCollapsed={isCollapsed} open>
      {isCollapsed ? (
        <CollapsedContainer>
          <IconBox>
            <IconButton
              size="small"
              onClick={() => dispatch(toggleComponentLibrary())}
            >
              <ChevronRightIcon />
            </IconButton>
          </IconBox>
          <CollapsedLabel>Component Library</CollapsedLabel>
        </CollapsedContainer>
      ) : (
        <Box>
          <DrawerHeader isCollapsed={isCollapsed}>
            <Typography>{COMPONENT_LIBRARY}</Typography>
            <IconButton
              size="small"
              onClick={() => dispatch(toggleComponentLibrary())}
            >
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>

          <Divider />

          <SearchWrapper>
            <TextField
              fullWidth
              size="small"
              placeholder="Search Component"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </SearchWrapper>

          <ScrollContainer className="scroll__container">
            {isLoading && (
              <Typography sx={{ p: 2 }}>Loading Components ....</Typography>
            )}
            {isError && (
              <Typography sx={{ p: 2 }} color="error">
                Failed to load Component Library
              </Typography>
            )}
            {!isLoading && (filteredCategories || []).length === 0 && (
              <Typography sx={{ p: 2 }}>No components found</Typography>
            )}
            {!isLoading && (filteredCategories || []).map(renderCategory)}
          </ScrollContainer>
        </Box>
      )}
    </ComponentDrawer>
  );
};

export default ComponentLibrary;
