import { SmartImage } from "../components/SmartImage";
import { LIVE_TRY_ON_VIDEO } from "../data/publicImages";
import { Product } from "../types";

interface AROverlayProps {
  products: Product[];
  currentId: string | null;
  onClose: () => void;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  onAdd: () => void;
}

export function AROverlay({ products, currentId, onClose, onBack, onPrev, onNext, onAdd }: AROverlayProps) {
  const index = Math.max(0, products.findIndex((item) => item.id === currentId));
  const item = products[index] ?? products[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#0f0f0f] p-3 text-white sm:p-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-[12px] font-medium uppercase tracking-wide text-neutral-400 hover:text-white">
          ← Back to results
        </button>
        <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-600 text-sm hover:border-white">✕</button>
      </div>
      <div className="mx-auto mt-4 grid max-w-xl gap-4 sm:mt-8 sm:gap-6 md:grid-cols-[1fr,140px]">
        <div className="h-[320px] overflow-hidden rounded-xl bg-[#1a1a1a] sm:h-[400px]">
          <video
            src={LIVE_TRY_ON_VIDEO}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="flex flex-col items-center gap-3 rounded-xl bg-[#1a1a1a] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Try-on</p>
          <div className="h-[100px] w-[100px] overflow-hidden rounded-lg bg-[#252525]">
            <SmartImage alt={item.name} sources={item.imageUrls} className="h-full w-full object-contain p-2" />
          </div>
          <p className="text-center text-[11px] leading-tight text-neutral-300">{item.name}</p>
          <p className="text-[13px] font-semibold text-emerald-400">${item.price}.00</p>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-emerald-400">● Ear detected ✓</p>
      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <button onClick={onPrev} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-600 hover:border-white">←</button>
        <span className="text-[13px] font-medium">
          {item.name} · ${item.price}
        </span>
        <button onClick={onNext} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-600 hover:border-white">→</button>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {products.map((product) => (
          <span key={product.id} className={`h-2 w-2 rounded-full transition-colors ${product.id === item.id ? "bg-white" : "bg-white/20"}`} />
        ))}
      </div>
      <button onClick={onAdd} className="mx-auto mt-8 block w-full max-w-sm bg-white py-3.5 text-[13px] font-semibold uppercase tracking-wider text-black transition-colors hover:bg-neutral-100">
        + Add to My Stack
      </button>
    </div>
  );
}
