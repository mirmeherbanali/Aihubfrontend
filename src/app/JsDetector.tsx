"use client";

import { useEffect } from "react";

export default function JsDetector() {
  useEffect(() => {
    document.documentElement.classList.add("js-enabled");
  }, []);

  return null;
}
