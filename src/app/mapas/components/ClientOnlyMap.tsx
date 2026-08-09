"use client";

import { useEffect, useState } from "react";
import MapWidget from "./MapWidget";

export default function ClientOnlyMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <MapWidget />;
}
