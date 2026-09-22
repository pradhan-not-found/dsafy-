import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

export function LiquidCard({ index = 0, className, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.38, delay: index * 0.045, ease: EASE }}
      className={cn("liquid-card-shell rounded-xl", className)}
    >
      {children}
    </motion.div>
  );
}
