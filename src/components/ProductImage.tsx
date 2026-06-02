// ProductImage.tsx — drop this into your src/components/ folder
// Usage: <ProductImage product={product} />

import { useState } from "react";

interface Product {
  name: string;
  imageUrl?: string;        // provided by updated server.ts
  imageSearchQuery?: string;
  rank?: number;
  brand?: string;
}

interface Props {
  product: Product;
  className?: string;
}

export function ProductImage({ product, className = "" }: Props) {
  const [errored, setErrored] = useState(false);

  // Primary: imageUrl injected by server
  // Fallback: fresh Unsplash query using imageSearchQuery
  // Last resort: brand-colored placeholder with initials
  const primarySrc = product.imageUrl;
  const fallbackSrc = product.imageSearchQuery
    ? `https://source.unsplash.com/featured/400x300/?${encodeURIComponent(product.imageSearchQuery)}`
    : null;

  if (errored || (!primarySrc && !fallbackSrc)) {
    // Placeholder with product initials
    const initials = product.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-white text-2xl font-bold rounded-xl ${className}`}
        style={{ aspectRatio: "4/3" }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={errored ? fallbackSrc! : (primarySrc || fallbackSrc!)}
      alt={`${product.name} product image`}
      className={`object-cover rounded-xl w-full ${className}`}
      style={{ aspectRatio: "4/3" }}
      onError={() => {
        if (!errored && fallbackSrc && (primarySrc !== fallbackSrc)) {
          setErrored(true); // triggers re-render with fallbackSrc
        }
      }}
      loading="lazy"
    />
  );
}
