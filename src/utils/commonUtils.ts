import { FE_CRYPTO_ID_PREFIX } from "@constants/commonConstants";

export const getNameInitials = (name?: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

export const getTeamInitials = (path: string | undefined): string => {
  return (path || "")
    .replace(/^\//, "")
    .split("-")
    .slice(1)
    .map(word => word[0]?.toUpperCase())
    .join("");
};

export const toTitleCase = (value: string): string => {
    if (!value) return value;

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  export const capitalizeFirstLetter = (value: string): string => {
  if (!value) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const generateFECustomDetectId = (): string => {
  try {
    const g = globalThis as typeof globalThis & { crypto?: Crypto };
    if (g?.crypto && typeof g.crypto.randomUUID === "function") {
      return `${FE_CRYPTO_ID_PREFIX}-${g.crypto.randomUUID()}`;
    }

    if (g?.crypto && typeof g.crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(16);
      g.crypto.getRandomValues(bytes);
      const hex = Array.from(bytes).map((b: number) => b.toString(16).padStart(2, "0")).join("");
      return `${FE_CRYPTO_ID_PREFIX}-${hex}`;
    }

    return `${FE_CRYPTO_ID_PREFIX}-${Date.now().toString(36)}`;
  } catch (e) {
    console.warn("Crypto ID generation failed, falling back to timestamp-based ID", e);
    return `${FE_CRYPTO_ID_PREFIX}-${Date.now().toString(36)}`;
  }
}

const fallbackDeepClone = (value: unknown): unknown => {
    if (value === null || typeof value !== "object") return value;

    if (Array.isArray(value)) {
      return value.map(fallbackDeepClone);
    }

    const cloned: Record<string, unknown> = {};
    for (const key of Object.keys(value)) {
      cloned[key] = fallbackDeepClone((value as Record<string, unknown>)[key]);
    }

    return cloned;
  };

export const safeClone = (v: unknown): unknown => {
    try {
      if (typeof structuredClone === "function") return structuredClone(v);
    } catch (e) {
      console.warn("structuredClone failed, falling back to manual deep clone", e);
    }

    try {
      return fallbackDeepClone(v);
    } catch (e) {
      console.warn("Manual deep clone failed, returning original value", e);
      return v;
    }
  };

  export function urlToPascalCaseKey(url: string) {
    const fileName = url.split("/").pop()?.replace(".svg", "") || "";
    return fileName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  }