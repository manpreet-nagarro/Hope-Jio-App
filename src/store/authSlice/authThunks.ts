import { createAsyncThunk } from "@reduxjs/toolkit";
import keycloak from "@auth/keycloak";

let refreshInterval: ReturnType<typeof setInterval> | null = null;

const setupTokenRefresh = () => {
  if (refreshInterval) return;

  refreshInterval = setInterval(async () => {
    try {
      await keycloak.updateToken(60);
    } catch (err) {
      console.error("Token refresh failed", err);
      keycloak.logout({
        redirectUri: window.location.origin + "/hope/login",
      });
    }
  }, 30000);
};

export const initAuth = createAsyncThunk("auth/init", async () => {
  const authenticated = await keycloak.init({
    checkLoginIframe: false,
    onLoad: "check-sso",
    pkceMethod: "S256",
    silentCheckSsoRedirectUri:
      window.location.origin + "/hope/silent-check-sso.html",
    flow: "standard",
  });

  if (!authenticated) {
    return {
      isAuthenticated: false,
      accessToken: null,
    };
  }

  setupTokenRefresh();

  return {
    isAuthenticated: true,
    accessToken: keycloak.token || null,
  };
});

export const login = createAsyncThunk("auth/login", async () => {
  await keycloak.login({
    redirectUri: window.location.origin + "/hope/wireframe",
  });
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await keycloak.logout({
    redirectUri: window.location.origin + "/hope/login",
  });
});
