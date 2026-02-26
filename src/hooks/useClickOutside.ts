import { useEffect } from "react";

import type { RefObject } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutsideMultiple<T extends HTMLElement>(
  refs: RefObject<T[]>,

  handler: Handler,

  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    const cleanup = attachClickOutsideListeners(refs, handler);

    return cleanup;
  }, [refs, handler, enabled]);
}

// Exported helper so tests can attach the same listeners without mounting React.
export function attachClickOutsideListeners<T extends HTMLElement>(
  refs: RefObject<T[]>,
  handler: Handler,
) {
  const listener = (event: MouseEvent | TouchEvent) => {
    const isInside = refs.current.some((el) => el && el.contains(event.target as Node));

    if (!isInside) handler(event);
  };

  document.addEventListener('mousedown', listener);
  document.addEventListener('touchstart', listener);

  return () => {
    document.removeEventListener('mousedown', listener);
    document.removeEventListener('touchstart', listener);
  };
}
