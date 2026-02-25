import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ResultSectionProps {
  title: string;
  icon: string;
  delay?: number;
  children: ReactNode;
}

const ResultSection = ({ title, icon, delay = 0, children }: ResultSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="rounded-xl bg-card p-6 md:p-8 border border-border"
  >
    <h3 className="flex items-center gap-3 text-xl md:text-2xl font-semibold mb-4">
      <span className="text-2xl">{icon}</span>
      {title}
    </h3>
    <div className="text-muted-foreground leading-relaxed">{children}</div>
  </motion.div>
);

export default ResultSection;
