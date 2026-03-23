import { Header } from "../components/Header";
import { SmartImage } from "../components/SmartImage";
import { StepBar } from "../components/StepBar";
import { ModelCanvas } from "../types";

interface CanvasScreenProps {
  selected: string | null;
  models: ModelCanvas[];
  onSelect: (value: string) => void;
  onUseOwnEar: () => void;
  onContinue: () => void;
  cartCount: number;
}

export function CanvasScreen({
  selected,
  models,
  onSelect,
  onUseOwnEar,
  onContinue,
  cartCount
}: CanvasScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header count={cartCount} />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-12">
        <StepBar currentStep={1} />
        <h2 className="mt-6 font-serif text-3xl md:text-4xl">Choose Your Ear</h2>
        <p className="mt-2 text-sm text-neutral-500">Select a model to start building your stack</p>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => onSelect(model.id)}
              className={`group overflow-hidden rounded-lg text-left transition-all ${selected === model.id ? "ring-2 ring-black" : "border border-neutral-200 hover:border-neutral-400"}`}
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#f9f8f6]">
                <SmartImage alt={model.name} sources={model.imageUrls} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="px-3 py-2.5">
                <p className="text-[13px] font-medium">{model.name}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={onUseOwnEar} className="btn-secondary w-full sm:w-auto">
            📷 Use My Own Ear
          </button>
          <button
            disabled={!selected}
            onClick={onContinue}
            className="btn-primary w-full disabled:opacity-40 sm:w-auto"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
