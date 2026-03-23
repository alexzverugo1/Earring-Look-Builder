import { motion } from "framer-motion";

export function QuizLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h2 className="font-serif text-4xl">Building your stack...</h2>
      <p className="mt-3 text-sm text-neutral-500">Matching earrings to your style</p>
      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((item) => (
          <motion.div
            key={item}
            className="h-2.5 w-2.5 rounded-full bg-black"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: item * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
