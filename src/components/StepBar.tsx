interface StepBarProps {
  currentStep: 1 | 2 | 3;
}

export function StepBar({ currentStep }: StepBarProps) {
  const steps = [
    { id: 1, label: "Canvas" },
    { id: 2, label: "Build" },
    { id: 3, label: "Buy" }
  ] as const;

  return (
    <div className="flex items-center gap-1 text-[11px]">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center gap-1">
          <div
            className={`flex h-6 w-6 items-center justify-center text-[10px] font-semibold transition-colors ${
              currentStep >= step.id
                ? "bg-black text-white"
                : "border border-neutral-300 text-neutral-400"
            }`}
          >
            {currentStep > step.id ? "✓" : step.id}
          </div>
          <span className={`font-medium uppercase tracking-wider ${currentStep >= step.id ? "text-black" : "text-neutral-400"}`}>
            {step.label}
          </span>
          {index < 2 && <div className="mx-1 h-px w-6 bg-neutral-200" />}
        </div>
      ))}
    </div>
  );
}
