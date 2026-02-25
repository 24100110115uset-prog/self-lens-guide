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
    className="relative rounded-3xl overflow-hidden group w-full"
  >
    {/* Gradient border effect */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 p-[1px]">
      <div className="w-full h-full rounded-3xl bg-card" />
    </div>

    {/* Content */}
    <div className="relative z-10 p-5 sm:p-7 md:p-9 lg:p-11">
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 pointer-events-none rounded-3xl" />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.1 }}
        className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left"
      />

      <div className="relative z-10 flex gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: delay + 0.2, stiffness: 200 }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-xl sm:text-2xl border border-primary/20"
            >
              {icon}
            </motion.div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-display text-foreground">
              {title}
            </h3>
          </div>
          <div className="text-muted-foreground leading-relaxed text-sm sm:text-base">{children}</div>
        </div>

        {illustration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
            className="hidden md:block w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0 rounded-2xl overflow-hidden opacity-40 border border-border/30"
          >
            <img src={illustration} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
);

export default ResultSection;
