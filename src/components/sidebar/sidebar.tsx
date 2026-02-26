import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, IconButton, ListItem, MenuItem } from "@mui/material";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import {
  DrawerFooter,
  DrawerNav,
  DrawerPaper,
  FooterTooltip,
  LogoBox,
  NavButton,
  NavIcon,
  NavList,
  NavWrapper,
  ProductSelect,
  ProductSelectWrapper,
} from "./sidebar.styles";

import LeftIcon from "@assets/icons-svg/leftIcon";
import RightIcon from "@assets/icons-svg/rightIcon";

import type { NavConfigItem } from "src/interfaces/commonInterfaces";
import type { ProductOption } from "src/types/commonTypes";
import type { RootState } from "@store/store";

import { ACTIVE_COLOR, INACTIVE_COLOR } from "../../constants/commonConstants";
import { ROUTE_ICON_MAP } from "./sidebar.routeMap";
import {
  toggleGlobalSidebar,
  setGlobalSidebarCollapsed,
} from "@store/UISlice/UISlice";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ProductOption>("ajio-sps");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isEditorPage = pathname.startsWith("/wireframe/editor");

  const navigationData = useSelector(
    (state: RootState) => state.navigation.data,
    shallowEqual,
  );

  const isGlobalSidebarCollapsed = useSelector(
    (state: RootState) => state.ui.isGlobalSidebarCollapsed,
  );

  useEffect(() => {
    dispatch(setGlobalSidebarCollapsed(isEditorPage));
  }, [isEditorPage, dispatch]);

  const isOpen = !isGlobalSidebarCollapsed;

  const toggleSidebar = useCallback(() => {
    dispatch(toggleGlobalSidebar());
  }, [dispatch]);

  const handleNavigate = useCallback(
    (path: string) => navigate(path),
    [navigate],
  );

  const navConfig: NavConfigItem[] = useMemo(() => {
    if (!navigationData?.navigation) return [];

    return navigationData.navigation
      .slice()
      .sort((a, b) => a.priority - b.priority)
      .flatMap((nav) => {
        const route = ROUTE_ICON_MAP[nav.title as keyof typeof ROUTE_ICON_MAP];

        if (!route) return [];

        return [
          {
            label: route.label,
            path: route.path,
            Icon: route.Icon,
          },
        ];
      });
  }, [navigationData]);

  const navItems = useMemo(
    () =>
      navConfig.map(({ label, path, Icon }) => {
        const isActive =
          path === "/" ? pathname === path : pathname.startsWith(path);

        return {
          label,
          path,
          isActive,
          icon: <Icon color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR} />,
        };
      }),
    [navConfig, pathname],
  );

  return (
    <DrawerNav isOpen={isOpen} variant="permanent">
      <DrawerPaper>
        <ProductSelectWrapper>
          <LogoBox collapsed={!isOpen} />

          <ProductSelect
            value={product}
            onChange={(e) => setProduct(e.target.value as ProductOption)}
            fullWidth
            size="small"
            collapsed={!isOpen}
          >
            <MenuItem value="ajio-sps">Ajio SPS</MenuItem>
          </ProductSelect>
        </ProductSelectWrapper>

        <NavWrapper>
          <NavList>
            {navItems.map(({ label, path, icon, isActive }) => (
              <ListItem key={path} disablePadding>
                <NavButton
                  collapsed={!isOpen}
                  active={isActive}
                  onClick={() => handleNavigate(path)}
                >
                  <NavIcon collapsed={!isOpen}>{icon}</NavIcon>
                  {isOpen && label}
                </NavButton>
              </ListItem>
            ))}
          </NavList>
        </NavWrapper>

        <Divider sx={{ background: "rgba(103, 137, 244, 0.2)" }} />

        <DrawerFooter>
          <FooterTooltip title="">
            <IconButton
              onClick={toggleSidebar}
              size="small"
              sx={{ color: "rgba(53, 53, 243, 1)" }}
            >
              {isOpen ? <LeftIcon /> : <RightIcon />}
            </IconButton>
          </FooterTooltip>
        </DrawerFooter>
      </DrawerPaper>
    </DrawerNav>
  );
};

export default Sidebar;
