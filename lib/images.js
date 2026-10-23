import manifest from "@/lib/photo-manifest.json";

const ALT = {
  "studio-crunch": "A woman in cream activewear doing an ab curl on a pale timber reformer, framed by palm leaves",
  "studio-lunge": "A woman holding a low lunge on a reformer beside an arched mirror, a palm and rattan cabinet in the ERA studio",
  "studio-swan": "A woman in olive activewear holding a swan pose on a reformer box, pulling the straps",
  "studio-straps": "A woman standing on a reformer working the straps, arched mirrors and windows behind her",
  "studio-portrait": "A woman in a black ERA unitard posing against a grey studio wall",
};

export function photo(slug) {
  const { width, height, widths } = manifest[slug];
  return { slug, width, height, widths, alt: ALT[slug] };
}
