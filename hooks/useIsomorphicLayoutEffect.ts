import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect that safely no-ops during SSR to avoid React warnings.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
