"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CheckoutDialog.module.css";

// Opens Momence package checkout inside the page. Buy links keep their real
// href (new tab) so they still work without JavaScript; with JS, a click on
// any [data-checkout] link opens this dialog instead.
export default function CheckoutDialog() {
  const dialogRef = useRef(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest("a[data-checkout]");
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      setItem({ url: link.href, name: link.dataset.checkout });
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onClose = () => {
    document.body.style.overflow = "";
    setItem(null);
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="checkout-title"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
    >
      <div className={styles.panel}>
        <div className={styles.bar}>
          <h2 id="checkout-title" className={`display ${styles.title}`}>
            {item?.name}
          </h2>
          <div className={styles.barActions}>
            {item && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={`link ${styles.out}`}>
                Open in Momence<span className="sr-only"> (new tab)</span>
              </a>
            )}
            <button type="button" className="btn btn-sm" onClick={() => dialogRef.current.close()}>
              Close
            </button>
          </div>
        </div>
        {item && (
          <iframe
            key={item.url}
            src={item.url}
            title={`${item.name}: checkout on Momence`}
            className={styles.frame}
          />
        )}
      </div>
    </dialog>
  );
}
