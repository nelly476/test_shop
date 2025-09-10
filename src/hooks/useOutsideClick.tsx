import { useEffect, RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(event.target as Node)) handler();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, handler]);
}
