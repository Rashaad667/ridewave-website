"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Renders the current year in the visitor's browser, so it never goes stale on a static page. */
export function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
  return <>{year}</>;
}
