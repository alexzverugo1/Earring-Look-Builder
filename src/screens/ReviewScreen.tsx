import { Header } from "../components/Header";
import { SmartImage } from "../components/SmartImage";
import { StepBar } from "../components/StepBar";
import { Product, SlotKey } from "../types";
import { slotLabels } from "../data/products";

interface ReviewScreenProps {
  slots: Record<SlotKey, Product | null>;
  upsells: Product[];
  subtotal: number;
  onEdit: (slot: SlotKey) => void;
  onAddUpsell: (product: Product) => void;
  onEditStack: () => void;
  onAddAllToBag: () => void;
  cartCount: number;
}

export function ReviewScreen({
  slots,
  upsells,
  subtotal,
  onEdit,
  onAddUpsell,
  onEditStack,
  onAddAllToBag,
  cartCount
}: ReviewScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header count={cartCount} />
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:px-12">
        <StepBar currentStep={3} />
        <h2 className="mt-6 font-serif text-3xl md:text-4xl">Your Stack</h2>
        <div className="mt-6 divide-y divide-neutral-100 rounded-lg border border-neutral-100">
          {(Object.keys(slots) as SlotKey[])
            .filter((key) => slots[key])
            .map((key) => (
              <div key={key} className="flex items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4 md:px-6">
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-[#f9f8f6]">
                  <SmartImage alt={slots[key]?.name ?? key} sources={slots[key]?.imageUrls ?? []} className="h-full w-full object-contain p-1" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium">{slots[key]?.name}</p>
                  <p className="text-[11px] text-neutral-500">{slotLabels[key]} · Standard</p>
                </div>
                <p className="text-[12px] font-semibold sm:text-[13px]">${slots[key]?.price}.00</p>
                <button onClick={() => onEdit(key)} className="text-[11px] font-medium uppercase tracking-wide text-neutral-500 underline underline-offset-2 hover:text-black">
                  Edit
                </button>
              </div>
            ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
          <p className="text-sm font-semibold">Subtotal</p>
          <p className="text-sm font-semibold">${subtotal}.00</p>
        </div>
        <button onClick={onAddAllToBag} className="btn-primary mt-4 w-full">
          + Add All to Bag
        </button>
        <button onClick={onEditStack} className="mt-3 w-full text-[13px] font-medium text-neutral-600 underline underline-offset-2 hover:text-black">
          ← Edit Stack
        </button>
        <h3 className="mt-10 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Complete Your Stack</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {upsells.map((upsell) => (
            <article key={upsell.id} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-lg bg-[#f9f8f6]">
                <SmartImage alt={upsell.name} sources={upsell.imageUrls} className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <p className="mt-2 text-[12px] leading-snug text-neutral-700">{upsell.name}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-[12px] font-semibold">${upsell.price}.00</p>
                <button onClick={() => onAddUpsell(upsell)} className="flex h-6 w-6 items-center justify-center border border-neutral-200 text-xs transition-colors hover:border-black hover:bg-black hover:text-white">
                  +
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
