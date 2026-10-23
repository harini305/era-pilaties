"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Page-level motion: hero entrance, section reveals and a few image reveals.
// Hooks: [data-hero="word|media|fade"], [data-reveal], [data-reveal-img].
export default function Motion() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    window.__eraMotion = true;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero='word'] > span",
        { yPercent: 105, autoAlpha: 1 },
        { yPercent: 0, duration: 1.1, stagger: 0.08 },
      )
        .fromTo(
          "[data-hero='media']",
          { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 1 },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out" },
          0.1,
        )
        .fromTo(
          "[data-hero='media'] img",
          { scale: 1.12 },
          { scale: 1, duration: 1.6, ease: "expo.out" },
          0.1,
        )
        .fromTo(
          "[data-hero='fade']",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 },
          0.5,
        );
      root.classList.remove("motion");

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 32,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        });
      });

      gsap.utils.toArray("[data-reveal-img]").forEach((el) => {
        const img = el.querySelector("img");
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 92%", once: true } })
          .from(el, { clipPath: "inset(8% 8% 8% 8%)", duration: 1.3, ease: "expo.out" })
          .from(img, { scale: 1.1, duration: 1.6, ease: "expo.out" }, 0);
      });
    });

    // Reduced motion: show everything immediately.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      root.classList.remove("motion");
    });

    return () => mm.revert();
  }, []);

  return null;
}
