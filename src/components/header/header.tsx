import * as React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Breadcrumb from "@components/breadcrumb/breadcrumb";
import {
  HeaderContainer,
  RightGroup,
  StyledAppBar,
  TitleGroup,
} from "./header.styles";
import { DeviceBadge } from "./shared/DeviceBadge";
import { ProfileMenu } from "./shared/ProfileMenu";

import type { RootState } from "@store/store";
import { COLORS, FONTS } from "@constants/theme.constants";
import { routeTitleMap } from "./routeTitleMap";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  const isEditorPage = pathname.startsWith("/wireframe/editor");

  const wireframeName = useSelector(
    (state: RootState) => state.wireframe.selectedWireframe?.wireframeName
  );

  const deviceType = useSelector(
    (state: RootState) => state.wireframe.selectedWireframe?.platform
  );

  const getTitle = () => {
    if (isEditorPage) return wireframeName || "";

    const matchedRoute = Object.keys(routeTitleMap).find((route) =>
      pathname.startsWith(route)
    );

    return matchedRoute ? routeTitleMap[matchedRoute] : "";
  };

  return (
    <StyledAppBar position="static">
      <HeaderContainer>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <TitleGroup>
            <Tooltip
              title={isEditorPage && wireframeName && wireframeName.length > 40 ? wireframeName : ""}
              placement="top"
              arrow
            >
              <span>
                <Typography
                  textTransform={isEditorPage ? "capitalize" : "none"}
                  variant="h5"
                  fontFamily={FONTS.FONT_FAMILY_BOLD}
                  color={COLORS.TEXT_DARK}
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                    wordBreak: "break-all",
                    maxWidth: 400,
                  }}
                >
                  {getTitle()}
                </Typography>
              </span>
            </Tooltip>

            {isEditorPage && <DeviceBadge label={deviceType || ""} />}
          </TitleGroup>

          <Breadcrumb />
        </Box>

        <RightGroup>
          <ProfileMenu />
        </RightGroup>
      </HeaderContainer>
    </StyledAppBar>
  );
};

export default Header;
