// Edited from docs/source-audit/content/site-content.json.
// Package details that conflict with Momence (audit 08, F1–F6) are omitted;
// only names, prices and terms both sources agree on are shown.

export const site = {
  name: "Era Reformer Pilates",
  location: "Bingin, Uluwatu — Bali",
  hours: "7am – 8pm, every day",
  instagram: { handle: "@era.pilates", url: "https://www.instagram.com/era.pilates" },
};

export const packageGroups = [
  {
    title: "Casual",
    items: [
      { id: "drop-in", name: "Drop In", detail: "1 × 45 min class", price: 200_000 },
      { id: "three-day", name: "3 Day Pass", detail: "3 × 45 min classes", price: 500_000 },
      { id: "ten-class", name: "10 Class Pass", detail: "10 × 45 min classes", price: 1_500_000 },
      { id: "weekly", name: "Weekly Pass", detail: "7 consecutive days", price: 850_000 },
    ],
  },
  {
    title: "Unlimited",
    items: [
      { id: "unlimited-1m", name: "1 Month", detail: "Unlimited classes", price: 2_000_000 },
      { id: "unlimited-3m", name: "3 Months", detail: "Unlimited classes", price: 6_000_000 },
      { id: "unlimited-6m", name: "6 Months", detail: "Unlimited classes", price: 10_000_000 },
      { id: "unlimited-12m", name: "12 Months", detail: "Unlimited classes", price: 15_000_000 },
    ],
  },
];

export const formatIdr = (amount) => `IDR ${amount.toLocaleString("en-US")}`;
