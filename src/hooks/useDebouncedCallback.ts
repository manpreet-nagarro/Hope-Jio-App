import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<number | NodeJS.Timeout | undefined>(undefined);
  const callbackRef = useRef<T>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      globalThis.clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  const debounced = useCallback((...args: Parameters<T>) => {
    cancel();
    timeoutRef.current = globalThis.setTimeout(() => {
      callbackRef.current(...args);
      timeoutRef.current = undefined;
    }, delay);
  }, [delay, cancel]);

  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return [debounced, cancel] as const;
}
