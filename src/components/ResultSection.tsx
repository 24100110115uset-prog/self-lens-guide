import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ResultSectionProps {
  title: string;
  icon: string;
  delay?: number;
  children: ReactNode;
  illustration?: string;
}

const ResultSection = ({ title, icon, delay = 0, children, illustration }: ResultSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="relative rounded-2xl glass-card p-6 md:p-8 overflow-hidden group"
  >
    {/* Hover glow effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />

    <div className="relative z-10 flex gap-6">
      <div className="flex-1">
        <h3 className="flex items-center gap-3 text-xl md:text-2xl font-semibold mb-4 font-display">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: delay + 0.2, stiffness: 200 }}
            className="text-2xl"
          >
            {icon}
          </motion.span>
          {title}
        </h3>
        <div className="text-muted-foreground leading-relaxed">{children}</div>
      </div>

      {illustration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="hidden md:block w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden opacity-60"
        >
          <img src={illustration} alt="" className="w-full h-full object-cover" />
        </motion.div>
      )}
    </div>
  </motion.div>
);

export default ResultSection;
