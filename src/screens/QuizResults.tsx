import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types";

interface QuizResultsProps {
  products: Product[];
  selectedIds: string[];
  onTryOn: (id: string) => void;
  onBuild: () => void;
  onScratch: () => void;
  cartCount: number;
}

export function QuizResults({
  products,
  selectedIds,
  onTryOn,
  onBuild,
  onScratch,
  cartCount
}: QuizResultsProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header count={cartCount} />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 md:px-12">
        <h2 className="font-serif text-3xl md:text-4xl">Your Recommendations</h2>
        <p className="mt-2 text-sm text-neutral-500">Based on your style · {products.length} picks for you</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={selectedIds.includes(product.id)}
              onTryOn={() => onTryOn(product.id)}
            />
          ))}
        </div>
        <div className="sticky bottom-0 mt-8 border-t border-neutral-100 bg-white pb-2 pt-4">
          <button onClick={onBuild} className="btn-primary w-full">
            Build My Stack with These →
          </button>
          <button onClick={onScratch} className="mt-3 w-full text-[13px] font-medium text-neutral-600 underline underline-offset-2 hover:text-black">
            Start from scratch
          </button>
        </div>
      </div>
    </div>
  );
}
