import * as React from "react";
import { useState } from "react";

import LogoutIcon from "@assets/icons-svg/logoutIcon";

import {
  ProfileAvatar,
  ProfileButton,
  ProfileContainer,
  ProfileName,
  TeamAndRole,
  StyledMenu,
  LogoutMenuItem,
} from "../header.styles";

import { capitalizeFirstLetter, getNameInitials } from "@utils/commonUtils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@store/store";
import { logout } from "@store/authSlice/authThunks";

export const ProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.navigation?.data);

  const open = Boolean(anchorEl);

  const renameSystemAdmin = (team: string | undefined, role: string | undefined) => {
    if (team === "System") {
      return "Super";
    } else if (team === "Tenant" && role !== "Admin") {
      return "";
    }
    return team;
  };

  return (
    <>
      <ProfileButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <ProfileAvatar>{getNameInitials(data?.user?.name)}</ProfileAvatar>

        <ProfileContainer>
          <ProfileName>{data?.user?.name ?? "User"}</ProfileName>
          <TeamAndRole>
            {renameSystemAdmin(data?.user?.team, data?.user?.role)}{" "}
            {capitalizeFirstLetter(data?.user?.role || "")}
          </TeamAndRole>
        </ProfileContainer>
      </ProfileButton>

      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: { ml: "-12px" },
          },
        }}
      >
        <LogoutMenuItem onClick={() => dispatch(logout())}>
          <LogoutIcon />
          Logout
        </LogoutMenuItem>
      </StyledMenu>
    </>
  );
};
