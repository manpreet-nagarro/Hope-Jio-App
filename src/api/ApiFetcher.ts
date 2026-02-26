import type { RootState } from "@store/store";
import { store } from "@store/store";

export const apiFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const state: RootState = store.getState();
  const token = state.auth.accessToken;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (response.status === 401) {
    console.warn("Backend returned 401 → redirect to unauthorized");
    window.location.href = "/hope/unauthorized";
    return Promise.reject(data || "Unauthorized");
  }

  if (!response.ok) {
    const error: any = new Error(
      data?.detailed_message ||
        data?.status_message ||
        `API Error ${response.status}`,
    );

    error.status = response.status;
    error.response = {
      status: response.status,
      data,
    };

    throw error;
  }

  return data as T;
};
