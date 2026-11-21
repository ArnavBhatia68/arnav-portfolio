"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: profile.timeZone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => "";

/** Current time in Tempe (Arizona doesn't observe DST, so it's always MST). */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <time className={className} aria-label={time ? `Local time in Tempe: ${time}` : undefined}>
      {time || "--:--"}
    </time>
  );
}
