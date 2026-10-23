import { Archivo, Manrope } from "next/font/google";
import "./globals.css";

// Exactly two families: Archivo (headings, wordmark, prices) and Manrope (body + UI).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Bali's first on-demand reformer pilates studio in Bingin, Uluwatu. Train when you want, how you want, with the focus you choose. Book online or walk in.";

export const metadata = {
  metadataBase: new URL("https://erapilates.co"),
  title: "ERA Reformer Pilates — On-demand reformer pilates in Bingin, Uluwatu",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Era Reformer Pilates",
    title: "ERA Reformer Pilates",
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "ERA Reformer Pilates", description },
};

export const viewport = { themeColor: "#F5F5F3" };

// Hides the hero before hydration so its entrance animation doesn't flash.
// Skipped under reduced motion; a timeout reveals content if scripts fail.
const motionBoot = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('motion');setTimeout(function(){if(!window.__eraMotion)d.classList.remove('motion')},2500)}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
