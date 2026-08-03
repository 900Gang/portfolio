"use client";

import { useSyncExternalStore, useCallback, useEffect } from "react";

const STORAGE_KEY = "portfolio-theme";
const LIGHT = "light";
const DARK = "dark";

function getTheme(): "dark" | "light" {
  if (typeof window === "undefined") return DARK;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === LIGHT || stored === DARK ? stored : DARK;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/**
 * Theme state shared across components (Navbar, CommandPalette).
 * Uses localStorage + useSyncExternalStore so all consumers stay in sync
 * and there is no hydration mismatch.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => DARK);
  const isDark = theme === DARK;

  // Apply the theme class whenever the resolved theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === LIGHT);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = getTheme() === DARK ? LIGHT : DARK;
    window.localStorage.setItem(STORAGE_KEY, next);
    // Notify all subscribers (same-tab too, since "storage" only fires cross-tab)
    window.dispatchEvent(new Event("storage"));
  }, []);

  return { theme, isDark, toggleTheme };
}
