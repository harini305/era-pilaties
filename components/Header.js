"use client";

import { useEffect, useRef, useState } from "react";
import { BOOK_ANCHOR } from "@/lib/momence";
import styles from "./Header.module.css";

const NAV = [
  { href: "#studio", label: "Studio" },
  { href: "#packages", label: "Packages" },
  { href: "#visit", label: "Visit" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const focusables = () => [toggleRef.current, ...menu.querySelectorAll("a")];
    document.body.style.overflow = "hidden";
    menu.querySelector("a")?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      } else if (e.key === "Tab") {
        const items = focusables();
        const i = items.indexOf(document.activeElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
        e.preventDefault();
        items[next].focus();
      }
    };
    const onResize = () => window.innerWidth > 860 && setOpen(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ""}`}>
      <div className={`wrap ${styles.bar}`}>
        <a href="#top" className={`display ${styles.logo}`} aria-label="ERA Reformer Pilates, back to top" onClick={close}>
          ERA
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={BOOK_ANCHOR} className={`btn btn-sm ${styles.book}`} onClick={close}>
            Book a class
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.toggleLabel}>{open ? "Close" : "Menu"}</span>
            <span className={styles.toggleIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={styles.menu}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className="wrap">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={`display ${styles.menuLink}`} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={BOOK_ANCHOR} className={`display ${styles.menuLink}`} onClick={close}>
                Book a class
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
