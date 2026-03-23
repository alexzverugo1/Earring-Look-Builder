"use client";

interface StepProgressProps {
  step: 1 | 2 | 3;
}

export function StepProgress({ step }: StepProgressProps) {
  const steps = [
    { id: 1, label: "Canvas" },
    { id: 2, label: "Build" },
    { id: 3, label: "Buy" }
  ] as const;

  return (
    <div className="step-progress">
      {steps.map((item) => (
        <div key={item.id} className={`step-progress-item ${step >= item.id ? "active" : ""}`}>
          <span className="step-index">{item.id}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
