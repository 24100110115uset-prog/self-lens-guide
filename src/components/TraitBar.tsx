import { motion } from "framer-motion";

interface TraitBarProps {
  name: string;
  level: string;
  reasoning: string;
  delay: number;
}

const levelConfig: Record<string, { width: string; color: string }> = {
  High: { width: "80%", color: "from-primary to-primary/70" },
  Moderate: { width: "50%", color: "from-accent to-accent/70" },
  Low: { width: "25%", color: "from-secondary-foreground/40 to-secondary-foreground/20" },
};

const TraitBar = ({ name, level, reasoning, delay }: TraitBarProps) => {
  const config = levelConfig[level] || levelConfig.Moderate;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="mb-6 last:mb-0 group"
    >
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-medium text-foreground">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4 }}
          className="text-sm font-semibold text-primary"
        >
          {level}
        </motion.span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary overflow-hidden mb-3">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${config.color}`}
          initial={{ width: 0 }}
          whileInView={{ width: config.width }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5 }}
        className="text-sm text-muted-foreground leading-relaxed"
      >
        {reasoning}
      </motion.p>
    </motion.div>
  );
};

export default TraitBar;
