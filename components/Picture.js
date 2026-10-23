import { photo } from "@/lib/images";

// Static responsive image from pre-generated WebP derivatives (no runtime optimizer).
export default function Picture({ slug, sizes, priority = false, className, position }) {
  const { width, height, widths, alt } = photo(slug);
  const srcSet = widths.map((w) => `/images/${slug}-${w}.webp ${w}w`).join(", ");
  const fallback = widths.find((w) => w >= 1200) ?? widths.at(-1);

  return (
    <img
      className={className}
      src={`/images/${slug}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
