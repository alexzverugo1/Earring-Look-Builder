import { Header } from "../components/Header";
import { SmartImage } from "../components/SmartImage";
import { getQuizImagesForOption } from "../data/quizImages";

interface QuizQuestionProps {
  step: 1 | 2 | 3 | 4;
  value: string;
  onSelect: (value: string) => void;
  onContinue?: () => void;
  onBack: () => void;
  onClose: () => void;
  cartCount: number;
}

const metalSwatchColor: Record<string, string> = {
  Gold: "#d4a843",
  Silver: "#b8bdc4",
  Mixed: "linear-gradient(135deg, #d4a843 0%, #b8bdc4 50%, #d4a843 100%)"
};

export function QuizQuestion({
  step,
  value,
  onSelect,
  onContinue,
  onBack,
  onClose,
  cartCount
}: QuizQuestionProps) {
  const heading =
    step === 1
      ? "How many piercings do you have?"
      : step === 2
        ? "What's your style vibe?"
        : step === 3
          ? "What metals do you prefer?"
          : "What's your budget?";

  const options =
    step === 1
      ? ["Just lobes", "2-3 spots", "4-5 spots", "6+ heavily pierced"]
      : step === 2
        ? ["Minimal & clean", "Bold & stacked", "Mix it up", "Not sure"]
        : step === 3
          ? ["Gold", "Silver", "Mixed"]
          : ["Under $50", "$50-$100", "$100+"];

  return (
    <div className="min-h-screen bg-white">
      <Header count={cartCount} showBack={step > 1} onBack={onBack} showClose onClose={onClose} />
      <div className="mx-auto max-w-4xl px-6 py-10 md:px-12 md:py-16">
        <p className="text-center text-[11px] font-medium uppercase tracking-widest text-neutral-400">{step} of 4</p>
        <h2 className="mt-3 text-center font-serif text-3xl md:text-5xl">{heading}</h2>

        {step !== 3 && (
          <div className={`mx-auto mt-10 grid max-w-[960px] ${step === 4 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"} gap-4`}>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => onSelect(option)}
                className={`group overflow-hidden rounded-lg bg-white text-left transition-all ${
                  value === option ? "ring-2 ring-black" : "border border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#f9f8f6]">
                  <SmartImage
                    alt={option}
                    sources={getQuizImagesForOption(option)}
                    className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-3 py-3">
                  <p className="text-[13px] font-medium">{option}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="mx-auto mt-10 max-w-[720px]">
            <div className="grid grid-cols-3 gap-4">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => onSelect(option)}
                  className={`group overflow-hidden rounded-lg bg-white text-center transition-all ${
                    value === option ? "ring-2 ring-black" : "border border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 px-4 pt-5">
                    <div
                      className="h-10 w-10 rounded-full shadow-sm"
                      style={{
                        background: metalSwatchColor[option] ?? "#ccc"
                      }}
                    />
                  </div>
                  <div className="aspect-[4/3] overflow-hidden bg-[#f9f8f6]">
                    <SmartImage
                      alt={option}
                      sources={getQuizImagesForOption(option)}
                      className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="py-3">
                    <p className="text-[13px] font-semibold uppercase tracking-wide">{option}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => onSelect("No preference")} className="btn-secondary mt-6 w-full">
              No preference
            </button>
            {value && (
              <button onClick={onContinue} className="btn-primary mt-3 w-full">
                Continue
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
