"use client";

import Image from "next/image";
import { Product } from "@/types/lookBuilder";

interface CartSheetProps {
  open: boolean;
  items: Product[];
  upsells: Product[];
  subtotal: number;
  freeShippingTarget?: number;
  onClose: () => void;
}

export function CartSheet({
  open,
  items,
  upsells,
  subtotal,
  freeShippingTarget = 150,
  onClose
}: CartSheetProps) {
  if (!open) return null;

  const progress = Math.min(100, (subtotal / freeShippingTarget) * 100);

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-header">
          <h3>Your Bag</h3>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="shipping-meter">
          <p>
            {subtotal >= freeShippingTarget
              ? "You unlocked free shipping!"
              : `Add $${(freeShippingTarget - subtotal).toFixed(2)} for free shipping`}
          </p>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="cart-items">
          {items.map((item) => (
            <article key={item.id} className="cart-item">
              <Image src={item.image} alt={item.name} width={70} height={70} />
              <div>
                <p>{item.name}</p>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </article>
          ))}
        </div>
        <h4>Final Add-ons</h4>
        <div className="upsell-scroll">
          {upsells.map((item) => (
            <article key={item.id} className="upsell-item">
              <Image src={item.image} alt={item.name} width={120} height={120} />
              <p>{item.name}</p>
            </article>
          ))}
        </div>
        <div className="cart-cta">
          <button className="button-primary">Proceed to Checkout</button>
          <button className="button-secondary" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
