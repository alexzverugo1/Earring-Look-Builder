"use client";

import Image from "next/image";
import { EarSlot, Product, SlotType } from "@/types/lookBuilder";

interface BuildStepProps {
  baseImage: string;
  slots: EarSlot[];
  selectedSlot: SlotType | null;
  slotProducts: Record<SlotType, Product | null>;
  onOpenSlot: (slotId: SlotType) => void;
  onOpenInspiration: () => void;
}

export function BuildStep({
  baseImage,
  slots,
  selectedSlot,
  slotProducts,
  onOpenSlot,
  onOpenInspiration
}: BuildStepProps) {
  return (
    <section className="build-step">
      <div className="build-header">
        <h2>Build your stack</h2>
        <button className="button-secondary" onClick={onOpenInspiration}>
          Get Inspired
        </button>
      </div>

      <div className="ear-canvas">
        <Image src={baseImage} alt="Ear canvas" width={450} height={520} />
        {slots.map((slot) => (
          <button
            key={slot.id}
            className={`slot-dot ${selectedSlot === slot.id ? "active" : ""}`}
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
            onClick={() => onOpenSlot(slot.id)}
            aria-label={slot.label}
          >
            +
          </button>
        ))}
      </div>

      <div className="slot-chip-row">
        {slots.map((slot) => (
          <button
            key={slot.id}
            className={`slot-chip ${selectedSlot === slot.id ? "selected" : ""}`}
            onClick={() => onOpenSlot(slot.id)}
          >
            {slot.label}: {slotProducts[slot.id]?.name ?? "Select"}
          </button>
        ))}
      </div>
    </section>
  );
}
