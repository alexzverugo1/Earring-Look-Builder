import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BottomSheetProps {
  children: ReactNode;
  heightClass?: string;
  onClose?: () => void;
  lockBackdrop?: boolean;
}

export function BottomSheet({
  children,
  heightClass = "h-[75%]",
  onClose,
  lockBackdrop = false
}: BottomSheetProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/50"
      onClick={() => {
        if (!lockBackdrop) onClose?.();
      }}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className={`absolute bottom-0 left-0 right-0 bg-white p-5 shadow-2xl md:left-auto md:right-0 md:top-0 md:w-[480px] md:rounded-none ${heightClass}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-neutral-200 md:hidden" />
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
