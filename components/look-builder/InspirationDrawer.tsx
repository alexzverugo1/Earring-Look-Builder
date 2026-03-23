"use client";

import { CuratedStack } from "@/types/lookBuilder";

interface InspirationDrawerProps {
  open: boolean;
  stacks: CuratedStack[];
  onApply: (stackId: string) => void;
  onClose: () => void;
}

export function InspirationDrawer({ open, stacks, onApply, onClose }: InspirationDrawerProps) {
  if (!open) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <h3>Get Inspired</h3>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="drawer-content">
          {stacks.map((stack) => (
            <article key={stack.id} className="stack-card">
              <h4>{stack.name}</h4>
              <p>{stack.description}</p>
              <button className="button-secondary" onClick={() => onApply(stack.id)}>
                Apply Stack
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
