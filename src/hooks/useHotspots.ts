import type { Hotspot } from "@components/HotSpots/HotSpots.types";
import { useRef, useState, useEffect, useCallback } from "react";
const MIN_SIZE_PCT = 3;
const MAX_HOTSPOTS = 3;
type Mode = "draw" | "drag" | "resize" | null;
export const useHotspots = ()=> {
 const containerRef = useRef<HTMLDivElement>(null);
 const [hotspots, setHotspots] = useState<Hotspot[]>([]);
 const [activeId, setActiveId] = useState<string | null>(null);
 const [mode, setMode] = useState<Mode>(null);
 const [temp, setTemp] = useState<Hotspot | null>(null);
 const start = useRef({ x: 0, y: 0 });
 const dragOffsetRef = useRef({ dx: 0, dy: 0 });
 const resizeEdgeRef = useRef<string | null>(null);

 /* ---------- Helpers ---------- */
 const getPct = (x: number, y: number) => {
   const rect = containerRef.current!.getBoundingClientRect();
   return {
     xPct: (x / rect.width) * 100,
     yPct: (y / rect.height) * 100,
   };
 };
 const overlap = (a: Hotspot, b: Hotspot) =>
   !(
     a.xPct + a.wPct <= b.xPct ||
     a.xPct >= b.xPct + b.wPct ||
     a.yPct + a.hPct <= b.yPct ||
     a.yPct >= b.yPct + b.hPct
   );
 const validate = (box: Hotspot, ignoreId?: string) =>
   !hotspots.some(
     h => h.id !== ignoreId && overlap(h, box)
   );
 const detectResizeEdge = (
   e: React.MouseEvent,
   hotspot: Hotspot
 ): string | null => {
   if (!containerRef.current) return null;
   const rect = containerRef.current.getBoundingClientRect();
   const hotspotX = (hotspot.xPct / 100) * rect.width;
   const hotspotY = (hotspot.yPct / 100) * rect.height;
   const hotspotW = (hotspot.wPct / 100) * rect.width;
   const hotspotH = (hotspot.hPct / 100) * rect.height;
   const mouseX = e.clientX - rect.left;
   const mouseY = e.clientY - rect.top;
   const threshold = 8;

   const isLeft = Math.abs(mouseX - hotspotX) < threshold;
   const isRight = Math.abs(mouseX - (hotspotX + hotspotW)) < threshold;
   const isTop = Math.abs(mouseY - hotspotY) < threshold;
   const isBottom = Math.abs(mouseY - (hotspotY + hotspotH)) < threshold;

   if (isTop && isLeft) return "tl";
   if (isTop && isRight) return "tr";
   if (isBottom && isLeft) return "bl";
   if (isBottom && isRight) return "br";
   if (isLeft) return "l";
   if (isRight) return "r";
   if (isTop) return "t";
   if (isBottom) return "b";
   return null;
 };
 /* ---------- Mouse Down ---------- */
 const startDraw = (e: React.MouseEvent) => {
   const rect = containerRef.current!.getBoundingClientRect();
   start.current = {
     x: e.clientX - rect.left,
     y: e.clientY - rect.top,
   };
   // Check if clicking on an active hotspot for drag/resize
   const activeHotspot = hotspots.find(h => h.id === activeId);
   if (activeHotspot) {
     const resizeEdge = detectResizeEdge(e, activeHotspot);
     if (resizeEdge) {
       resizeEdgeRef.current = resizeEdge;
       setMode("resize");
       return;
     }
     // Check if click is inside the hotspot
     const hotspotX = (activeHotspot.xPct / 100) * rect.width;
     const hotspotY = (activeHotspot.yPct / 100) * rect.height;
     const hotspotW = (activeHotspot.wPct / 100) * rect.width;
     const hotspotH = (activeHotspot.hPct / 100) * rect.height;
     const mouseX = e.clientX - rect.left;
     const mouseY = e.clientY - rect.top;
     if (
       mouseX >= hotspotX &&
       mouseX <= hotspotX + hotspotW &&
       mouseY >= hotspotY &&
       mouseY <= hotspotY + hotspotH
     ) {
       dragOffsetRef.current = {
         dx: mouseX - hotspotX,
         dy: mouseY - hotspotY,
       };
       setMode("drag");
       return;
     }
   }
   // Click outside all hotspots - clear selection and start new draw
   setActiveId(null);
   setMode("draw");
   setTemp({
     id: "temp",
     xPct: 0,
     yPct: 0,
     wPct: 0,
     hPct: 0,
   });
 };
 /* ---------- Mouse Move Handlers ---------- */
 const handleDraw = (rect: DOMRect, cx: number, cy: number) => {
   const x = Math.min(cx, start.current.x);
   const y = Math.min(cy, start.current.y);
   const w = Math.abs(cx - start.current.x);
   const h = Math.abs(cy - start.current.y);
   const box: Hotspot = {
     id: "temp",
     ...getPct(x, y),
     wPct: (w / rect.width) * 100,
     hPct: (h / rect.height) * 100,
   };
   setTemp(box);
 };

 const handleDrag = (rect: DOMRect, cx: number, cy: number) => {
   if (!activeId) return;
   const hotspot = hotspots.find(h => h.id === activeId);
   if (!hotspot) return;
   const newXPct = ((cx - dragOffsetRef.current.dx) / rect.width) * 100;
   const newYPct = ((cy - dragOffsetRef.current.dy) / rect.height) * 100;
   const updated: Hotspot = {
     ...hotspot,
     xPct: Math.max(0, Math.min(100 - hotspot.wPct, newXPct)),
     yPct: Math.max(0, Math.min(100 - hotspot.hPct, newYPct)),
   };
   if (validate(updated, activeId)) {
     setHotspots(hs =>
       hs.map(h => (h.id === activeId ? updated : h))
     );
   }
 };

 const handleResize = (rect: DOMRect, cx: number, cy: number) => {
   if (!activeId || !resizeEdgeRef.current) return;
   const hotspot = hotspots.find(h => h.id === activeId);
   if (!hotspot) return;
   const edge = resizeEdgeRef.current;
   const deltaX = ((cx - start.current.x) / rect.width) * 100;
   const deltaY = ((cy - start.current.y) / rect.height) * 100;
   const updated: Hotspot = { ...hotspot };

   // Handle left edge - moves position and reduces/increases width
   if (edge.includes("l")) {
     updated.xPct += deltaX;
     updated.wPct -= deltaX;
   }
   // Handle right edge - only affects width
   if (edge.includes("r")) {
     updated.wPct += deltaX;
   }
   // Handle top edge - moves position and reduces/increases height
   if (edge.includes("t")) {
     updated.yPct += deltaY;
     updated.hPct -= deltaY;
   }
   // Handle bottom edge - only affects height
   if (edge.includes("b")) {
     updated.hPct += deltaY;
   }

   updated.wPct = Math.max(MIN_SIZE_PCT, updated.wPct);
   updated.hPct = Math.max(MIN_SIZE_PCT, updated.hPct);
   updated.xPct = Math.max(0, Math.min(100 - updated.wPct, updated.xPct));
   updated.yPct = Math.max(0, Math.min(100 - updated.hPct, updated.yPct));

   if (validate(updated, activeId)) {
     setHotspots(hs =>
       hs.map(h => (h.id === activeId ? updated : h))
     );
     start.current = { x: cx, y: cy };
   }
 };

 /* ---------- Mouse Move ---------- */
 const onMove = (e: MouseEvent) => {
   if (!mode || !containerRef.current) return;
   const rect = containerRef.current.getBoundingClientRect();
   const cx = e.clientX - rect.left;
   const cy = e.clientY - rect.top;

   if (mode === "draw") {
     handleDraw(rect, cx, cy);
   } else if (mode === "drag") {
     handleDrag(rect, cx, cy);
   } else if (mode === "resize") {
     handleResize(rect, cx, cy);
   }
 };
 /* ---------- Mouse Up ---------- */
 const onUp = () => {
   if (mode === "draw") {
     if (!temp || temp.wPct < MIN_SIZE_PCT || temp.hPct < MIN_SIZE_PCT) {
       setTemp(null);
       setMode(null);
       return;
     }
     if (hotspots.length >= MAX_HOTSPOTS) {
       alert(`Maximum ${MAX_HOTSPOTS} hotspots allowed`);
       setTemp(null);
       setMode(null);
       return;
     }
     if (validate(temp)) {
       setHotspots(h => [...h, { ...temp, id: crypto.randomUUID() }]);
     } else {
       alert("Overlapping hotspots not allowed");
     }
     setTemp(null);
     setMode(null);
   } else if (mode === "drag" || mode === "resize") {
     setMode(null);
     resizeEdgeRef.current = null;
   }
 };

 const deleteActiveHotspot = useCallback((selId?: string | null) => {
   setHotspots(hs => hs.filter(h => h.id !== (activeId || selId)));
   setActiveId(null);
 }, [activeId]);

 /* ---------- Delete ---------- */
 useEffect(() => {
   const onKey = (e: KeyboardEvent) => {
     if (e.key === "Delete" && activeId) {
       const confirmed = globalThis.confirm("Are you sure you want to delete this hotspot?");
       if (confirmed) {
         deleteActiveHotspot();
       }
     }
   };
   globalThis.addEventListener("keydown", onKey);
   return () => globalThis.removeEventListener("keydown", onKey);
 }, [activeId, deleteActiveHotspot]);
 /* ---------- Bindings ---------- */
 useEffect(() => {
   globalThis.addEventListener("mousemove", onMove);
   globalThis.addEventListener("mouseup", onUp);
   return () => {
     globalThis.removeEventListener("mousemove", onMove);
     globalThis.removeEventListener("mouseup", onUp);
   };
 });
 return {
   containerRef,
   hotspots,
   temp,
   activeId,
   setActiveId,
   startDraw,
   deleteActiveHotspot,
 };
}