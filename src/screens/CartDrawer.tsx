import { BottomSheet } from "../components/BottomSheet";
import { ProgressBar } from "../components/ProgressBar";
import { SmartImage } from "../components/SmartImage";
import { Product } from "../types";

interface CartDrawerProps {
  items: Product[];
  subtotal: number;
  upsells: Product[];
  onClose: () => void;
  onContinueShopping: () => void;
  onAddUpsell: (product: Product) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  items,
  subtotal,
  upsells,
  onClose,
  onContinueShopping,
  onAddUpsell,
  onCheckout
}: CartDrawerProps) {
  const remaining = Math.max(0, 120 - subtotal);
  const progress = Math.min(100, (subtotal / 120) * 100);

  return (
    <BottomSheet heightClass="h-[90%]" lockBackdrop>
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <h3 className="font-serif text-2xl">Your Bag</h3>
        <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-sm hover:border-black">✕</button>
      </div>
      <div className="mt-3 max-h-[34vh] divide-y divide-neutral-100 overflow-y-auto">
        {items.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex items-center gap-3 py-3">
            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#f9f8f6]">
              <SmartImage alt={item.name} sources={item.imageUrls} className="h-full w-full object-contain p-1" />
            </div>
            <div className="flex-1 text-[13px]">{item.name}</div>
            <div className="text-[13px] font-semibold">${item.price}.00</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between border-t border-neutral-100 pt-3 text-sm font-semibold">
        <p>Subtotal</p>
        <p>${subtotal}.00</p>
      </div>
      <div className="mt-4 rounded-lg bg-[#f9f8f6] p-4">
        <p className="text-[12px] text-neutral-600">🚚 Add ${remaining} more for free shipping</p>
        <div className="mt-2">
          <ProgressBar value={progress} />
        </div>
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">People Also Added</p>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {upsells.slice(0, 3).map((item) => (
          <article key={item.id} className="w-28 flex-shrink-0">
            <div className="aspect-square overflow-hidden rounded-lg bg-[#f9f8f6]">
              <SmartImage alt={item.name} sources={item.imageUrls} className="h-full w-full object-contain p-2" />
            </div>
            <p className="mt-1.5 text-[11px] leading-snug">{item.name}</p>
            <p className="text-[11px] font-semibold">${item.price}.00</p>
            <button onClick={() => onAddUpsell(item)} className="mt-1 w-full border border-neutral-200 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors hover:border-black hover:bg-black hover:text-white">
              + Add
            </button>
          </article>
        ))}
      </div>
      <div className="sticky bottom-0 mt-5 border-t border-neutral-100 bg-white pt-3">
        <button onClick={onCheckout} className="btn-primary w-full">
          Proceed to Checkout
        </button>
        <button onClick={onContinueShopping} className="btn-secondary mt-2 w-full">
          Continue Shopping
        </button>
      </div>
    </BottomSheet>
  );
}
