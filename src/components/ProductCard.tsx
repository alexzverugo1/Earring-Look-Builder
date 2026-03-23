import { Product } from "../types";
import { SmartImage } from "./SmartImage";

interface ProductCardProps {
  product: Product;
  onTryOn?: () => void;
  selected?: boolean;
}

export function ProductCard({ product, onTryOn, selected }: ProductCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f9f8f6]">
        <SmartImage
          alt={product.name}
          sources={product.imageUrls}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute bottom-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow-sm transition-shadow hover:shadow-md">
          ♡
        </button>
        {onTryOn && (
          <button
            onClick={(e) => { e.stopPropagation(); onTryOn(); }}
            className="absolute bottom-2 right-2 rounded-md border-2 border-black bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-black shadow-md transition-colors hover:bg-black hover:text-white"
          >
            Try On
          </button>
        )}
        {selected && (
          <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center bg-black text-[10px] font-bold text-white">✓</div>
        )}
      </div>
      <p className="mt-2 text-[13px] leading-snug text-neutral-800">{product.name}</p>
      <p className="mt-0.5 text-[13px] font-semibold">${product.price}.00</p>
      <div className="mt-1.5 flex gap-1">
        {product.metals.slice(0, 3).map((metal) => (
          <span
            key={metal}
            className="h-3 w-3 rounded-full border border-black/10"
            style={{
              backgroundColor:
                metal === "gold" ? "#d4a843" : metal === "silver" ? "#b8bdc4" : metal === "rose" ? "#d8a08f" : "#1a1a1a"
            }}
          />
        ))}
      </div>
    </article>
  );
}
