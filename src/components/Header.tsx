import { Link } from "react-router-dom";

interface HeaderProps {
  count: number;
  showBack?: boolean;
  onBack?: () => void;
  showClose?: boolean;
  onClose?: () => void;
}

export function Header({ count, showBack, onBack, showClose, onClose }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#e5e5e5] px-4 py-3 md:px-8">
      <div className="w-20">
        {showBack && (
          <button onClick={onBack} className="text-xs font-medium uppercase tracking-wide text-neutral-600 hover:text-black">
            ← Back
          </button>
        )}
      </div>
      <div className="text-center">
        <Link
          to="/"
          className="inline-block transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          aria-label="Banter — Home"
        >
          <span className="font-serif text-xl tracking-[0.15em]">BANTER</span>
          <span className="ml-1 hidden text-[9px] font-light tracking-[0.04em] text-neutral-400 md:inline">by Piercing Pagoda</span>
        </Link>
      </div>
      <div className="flex w-20 items-center justify-end gap-3">
        {showClose ? (
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-sm hover:border-black">
            ✕
          </button>
        ) : (
          <div className="relative cursor-pointer text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-semibold text-white">
                {count}
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
