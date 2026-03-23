interface SlotChipProps {
  label: string;
  value: string | null;
  price?: number;
  onClick: () => void;
}

export function SlotChip({ label, value, price, onClick }: SlotChipProps) {
  const filled = Boolean(value);
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
        filled
          ? "bg-black text-white"
          : "border border-neutral-200 bg-white text-neutral-500 hover:border-black"
      }`}
    >
      {label} {filled ? `· $${price}` : "· +"}
    </button>
  );
}
