import { motion } from "framer-motion";

interface TraitBarProps {
  name: string;
  level: string;
  reasoning: string;
  delay: number;
}

const levelWidth: Record<string, string> = {
  High: "80%",
  Moderate: "50%",
  Low: "25%",
};

const TraitBar = ({ name, level, reasoning, delay }: TraitBarProps) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
    className="mb-6 last:mb-0"
  >
    <div className="flex justify-between items-baseline mb-2">
      <span className="font-medium text-foreground">{name}</span>
      <span className="text-sm font-medium text-primary">{level}</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden mb-2">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: levelWidth[level] || "50%" }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
      />
    </div>
    <p className="text-sm text-muted-foreground">{reasoning}</p>
  </motion.div>
);

export default TraitBar;
