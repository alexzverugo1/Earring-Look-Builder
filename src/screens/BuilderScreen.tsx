import { Header } from "../components/Header";
import { SmartImage } from "../components/SmartImage";
import { SlotChip } from "../components/SlotChip";
import { StepBar } from "../components/StepBar";
import { Product, SlotKey } from "../types";
import { slotLabels } from "../data/products";

interface BuilderScreenProps {
  slots: Record<SlotKey, Product | null>;
  canvasImageUrls: string[];
  onOpenSlot: (slot: SlotKey) => void;
  onOpenInspiration: () => void;
  onTryOn: () => void;
  onContinue: () => void;
  total: number;
  filledCount: number;
  cartCount: number;
}

export function BuilderScreen({
  slots,
  canvasImageUrls,
  onOpenSlot,
  onOpenInspiration,
  onTryOn,
  onContinue,
  total,
  filledCount,
  cartCount
}: BuilderScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header count={cartCount} />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-12">
        <StepBar currentStep={2} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[400px,1fr]">
          <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-xl bg-[#f9f8f6]">
            <div className="relative aspect-[3/4]">
              <SmartImage
                alt="Selected ear canvas"
                sources={canvasImageUrls}
                className="h-full w-full object-cover"
              />
              {/* Overlay CTA — duplicated with the row below so try-on is always visible on the canvas */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/55 via-black/10 to-transparent pt-16 pb-3">
                <div className="pointer-events-auto flex justify-center px-3 sm:px-4">
                  <button
                    type="button"
                    onClick={onTryOn}
                    className="w-full max-w-[220px] rounded-md border-2 border-black bg-white px-4 py-3 text-center text-[12px] font-bold uppercase tracking-wider text-black shadow-lg ring-2 ring-white/90 transition-colors hover:bg-black hover:text-white sm:max-w-none sm:px-5"
                  >
                    Try it on
                  </button>
                </div>
              </div>
            </div>
            <button onClick={() => onOpenSlot("lobe")} className="absolute left-[30%] top-[28%] z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-white text-[11px] font-bold shadow-sm transition-transform hover:scale-110">
              {slots.lobe ? "•" : "+"}
            </button>
            <button onClick={() => onOpenSlot("secondLobe")} className="absolute left-[45%] top-[42%] z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-white text-[11px] font-bold shadow-sm transition-transform hover:scale-110">
              {slots.secondLobe ? "•" : "+"}
            </button>
            <button onClick={() => onOpenSlot("helix")} className="absolute left-[55%] top-[14%] z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-white text-[11px] font-bold shadow-sm transition-transform hover:scale-110">
              {slots.helix ? "•" : "+"}
            </button>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">Tap a spot to add an earring</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Object.keys(slots) as SlotKey[]).map((slotKey) => (
                <SlotChip
                  key={slotKey}
                  label={slotLabels[slotKey]}
                  value={slots[slotKey]?.name ?? null}
                  price={slots[slotKey]?.price}
                  onClick={() => onOpenSlot(slotKey)}
                />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button type="button" onClick={onOpenInspiration} className="btn-secondary w-full py-3">
                ✨ Get Inspired
              </button>
              <button type="button" onClick={onTryOn} className="btn-primary w-full border-2 border-black py-3 text-sm font-bold uppercase tracking-wide shadow-md ring-2 ring-black/5">
                Try It On
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-4 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">{filledCount} items · ${total}.00</p>
                <p className="text-[11px] text-neutral-400">Free shipping on $50+</p>
              </div>
              <button
                disabled={filledCount === 0}
                onClick={onContinue}
                className="btn-primary disabled:opacity-40"
              >
                Continue to Review →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
