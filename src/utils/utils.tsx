// eslint-disable-next-line react-refresh/only-export-components
export const normalizePlatformName = (platform?: string): string => {
  return platform?.trim().toLowerCase() ?? '';
}

export const isTempId = (id: unknown): boolean => typeof id === "string" && id.startsWith("fe__id__slot__");