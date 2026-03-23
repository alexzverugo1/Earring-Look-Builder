"use client";

import Image from "next/image";
import { Product, SlotType } from "@/types/lookBuilder";

interface ReviewStepProps {
  items: [SlotType, Product][];
  subtotal: number;
  upsells: Product[];
  onEdit: (slot: SlotType) => void;
  onAddAll: () => void;
}

export function ReviewStep({ items, subtotal, upsells, onEdit, onAddAll }: ReviewStepProps) {
  return (
    <section className="review-step">
      <h2>Review & Buy</h2>
      <div className="review-list">
        {items.map(([slot, product]) => (
          <article key={slot} className="review-item">
            <Image src={product.image} alt={product.name} width={80} height={80} />
            <div>
              <p>{slot}</p>
              <h4>{product.name}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <button onClick={() => onEdit(slot)}>Edit</button>
          </article>
        ))}
      </div>
      <div className="review-total">
        <p>Subtotal</p>
        <strong>${subtotal.toFixed(2)}</strong>
      </div>
      <button className="button-primary" onClick={onAddAll}>
        Add All to Bag
      </button>

      <div className="upsell-row">
        <h3>Complete Your Stack</h3>
        <div className="upsell-scroll">
          {upsells.map((item) => (
            <article key={item.id} className="upsell-item">
              <Image src={item.image} alt={item.name} width={150} height={150} />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
