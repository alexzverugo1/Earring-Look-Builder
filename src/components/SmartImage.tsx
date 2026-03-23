import { useMemo, useState } from "react";

/** Last-resort neutral SVG data URI so exhausted chains never leave a layout hole. */
const PLACEHOLDER_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e7e5e4"/><stop offset="100%" stop-color="#d6d3d1"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="200" cy="200" r="48" fill="none" stroke="#a8a29e" stroke-width="2" opacity="0.5"/><text x="200" y="208" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#78716c">Image</text></svg>`
  );

interface SmartImageProps {
  alt: string;
  sources: string[];
  className?: string;
}

export function SmartImage({ alt, sources, className }: SmartImageProps) {
  const validSources = useMemo(() => sources.filter(Boolean), [sources]);
  const chain = useMemo(() => [...validSources, PLACEHOLDER_SVG], [validSources]);
  const [index, setIndex] = useState(0);
  const [fallbackBlock, setFallbackBlock] = useState(false);

  const src = chain[Math.min(index, chain.length - 1)];

  if (validSources.length === 0) {
    return (
      <div
        className={`bg-gradient-to-br from-stone-200 to-stone-300 ${className ?? ""}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  if (fallbackBlock) {
    return (
      <div
        className={`bg-gradient-to-br from-stone-200 to-stone-300 ${className ?? ""}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        setIndex((prev) => {
          if (prev >= chain.length - 1) {
            setFallbackBlock(true);
            return prev;
          }
          return prev + 1;
        });
      }}
    />
  );
}
