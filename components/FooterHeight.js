"use client";

import { useEffect } from "react";

// Publishes the footer's height as --footer-h so the Visit section can size
// itself to fill the rest of the screen (see .visit in app/page.module.css).
export default function FooterHeight() {
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty("--footer-h", `${footer.offsetHeight}px`);
    const observer = new ResizeObserver(update);
    observer.observe(footer);
    update();
    return () => observer.disconnect();
  }, []);

  return null;
}
