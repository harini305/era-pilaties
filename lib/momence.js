// Every Momence destination used by the site lives here, so links can be
// updated in one place. All URLs were verified on 2026-10-23 (HTTP 200, and
// no X-Frame-Options / frame-ancestors headers, so they can be embedded).
// Purchases, bookings and payments happen entirely inside Momence.

export const MOMENCE_HOST = "https://momence.com";

// Booking board 37532 / boardId 12683 ("45min Reformer"), embedded in #book.
export const BOOKING_URL = `${MOMENCE_HOST}/appointments/37532?boardId=12683`;

// In-page anchor used by every "Book a class" button.
export const BOOK_ANCHOR = "#book";

// Package checkout links, keyed by package id in lib/content.js.
// null = no confirmed destination; the UI shows no buy button.
const PACKAGE_IDS = {
  "drop-in": 182640,
  "three-day": 182641,
  "ten-class": 182648,
  weekly: 182646,
  "unlimited-1m": null,
  "unlimited-3m": 182643,
  "unlimited-6m": 182642,
  "unlimited-12m": 182645,
};

export function packageUrl(id) {
  const momenceId = PACKAGE_IDS[id];
  return momenceId ? `${MOMENCE_HOST}/m/${momenceId}` : null;
}

// Fallback when the on-site checkout dialog can't run (no JS) or the visitor
// chooses to continue on Momence.
export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" };
