import { useEffect, useState } from "react";

type SvgIconProps = {
  src: string;
  size?: number;
  className?: string;
};

// Simple in-memory cache to avoid refetching during the app lifecycle
const svgMemoryCache = new Map<string, string>();

const LOCAL_STORAGE_PREFIX = "hope_svg_cache:";

// TTL for cached SVGs in milliseconds (default: 24 hours)
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type LocalCacheEntry = {
  svg: string;
  ts: number;
};

const readFromLocal = (src: string): string | null => {
  try {
    const key = LOCAL_STORAGE_PREFIX + encodeURIComponent(src);
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      const parsed: LocalCacheEntry = JSON.parse(raw);
      if (!parsed?.svg || !parsed?.ts) {
        localStorage.removeItem(key);
        return null;
      }
      const age = Date.now() - parsed.ts;
      if (age > CACHE_TTL_MS) {
        // expired
        localStorage.removeItem(key);
        return null;
      }
      return parsed.svg;
    } catch (e) {
      console.error("Error parsing SVG cache entry, treating as raw SVG", e);
      // if stored value isn't JSON (older version), treat as raw svg
      // and wrap it with timestamp
      if (raw?.trim()?.startsWith("<")) {
        writeToLocal(src, raw);
        return raw;
      }
      localStorage.removeItem(key);
      return null;
    }
  } catch (e) {
    console.error("Error reading SVG from localStorage", e);
    return null;
  }
};

const writeToLocal = (src: string, svg: string) => {
  try {
    const key = LOCAL_STORAGE_PREFIX + encodeURIComponent(src);
    const entry: LocalCacheEntry = { svg, ts: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (e) {
    console.error("Error writing SVG to localStorage", e);
  }
};

const SvgIcon = ({ src, size = 16, className }: SvgIconProps) => {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    if (!src) return;

    // If present in memory cache, use it
    const mem = svgMemoryCache.get(src);
    if (mem) {
      // schedule update asynchronously to avoid synchronous setState inside effect
      Promise.resolve().then(() => setSvg(mem));
      return;
    }

    // Try localStorage next
    const local = readFromLocal(src);
    if (local) {
      svgMemoryCache.set(src, local);
      // schedule update asynchronously to avoid synchronous setState inside effect
      Promise.resolve().then(() => setSvg(local));
      return;
    }

    const controller = new AbortController();

    fetch(src, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch svg: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        svgMemoryCache.set(src, text);
        writeToLocal(src, text);
        setSvg(text);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        // don't crash the UI – leave svg empty
        console.warn("SvgIcon fetch failed", err);
      });

    return () => controller.abort();
  }, [src]);

  if (!svg) return null;

  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default SvgIcon;
