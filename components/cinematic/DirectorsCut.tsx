"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface DirectorsCutValue {
  enabled: boolean;
  toggle: () => void;
  set: (v: boolean) => void;
}

const DirectorsCutContext = createContext<DirectorsCutValue | null>(null);

/**
 * Global "Director's Cut" mode. When enabled, the site layers on stronger
 * film grain, REC indicators, timecode overlays and behind-the-scenes content.
 */
export function DirectorsCutProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const toggle = useCallback(() => setEnabled((v) => !v), []);
  const set = useCallback((v: boolean) => setEnabled(v), []);

  return (
    <DirectorsCutContext.Provider value={{ enabled, toggle, set }}>
      {children}
    </DirectorsCutContext.Provider>
  );
}

export function useDirectorsCut() {
  const ctx = useContext(DirectorsCutContext);
  if (!ctx) {
    // Safe fallback so components don't crash if used outside the provider.
    return { enabled: false, toggle: () => {}, set: () => {} };
  }
  return ctx;
}
