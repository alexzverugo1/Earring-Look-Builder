"use client";

import Image from "next/image";
import { Product } from "@/types/lookBuilder";

interface ProductPickerSheetProps {
  open: boolean;
  title: string;
  products: Product[];
  onClose: () => void;
  onSelect: (productId: string) => void;
}

export function ProductPickerSheet({
  open,
  title,
  products,
  onClose,
  onSelect
}: ProductPickerSheetProps) {
  if (!open) return null;

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-header">
          <h3>{title}</h3>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="sheet-grid">
          {products.map((product) => (
            <button key={product.id} className="picker-item" onClick={() => onSelect(product.id)}>
              <Image src={product.image} alt={product.name} width={120} height={120} />
              <div>
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
