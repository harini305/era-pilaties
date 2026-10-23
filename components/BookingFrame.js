"use client";

import { useEffect, useState } from "react";
import { MOMENCE_HOST } from "@/lib/momence";

// Momence's booking board posts {type: "iframe_appointments_<id>_resize", height}
// to the parent page; follow it so the frame always fits its content.
export default function BookingFrame({ src, title, className }) {
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== MOMENCE_HOST) return;
      let data = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (typeof data?.type === "string" && data.type.endsWith("_resize") && data.height > 200) {
        setHeight(Math.ceil(data.height));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      className={className}
      style={height ? { height: `${height}px` } : undefined}
    />
  );
}
