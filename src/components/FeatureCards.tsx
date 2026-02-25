import { motion } from "framer-motion";

const features = [
  {
    icon: "🧭",
    title: "Big Five Traits",
    description: "Discover where you fall on Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.",
  },
  {
    icon: "💬",
    title: "Communication Style",
    description: "Understand your natural tone, emotional expression, and how others perceive your words.",
  },
  {
    icon: "🌱",
    title: "Growth Insights",
    description: "Receive constructive suggestions for personal development alongside your strengths.",
  },
];

const FeatureCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    {features.map((f, i) => (
      <motion.div
        key={f.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.15 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="rounded-2xl glass-card p-6 text-center glow-shadow"
      >
        <motion.span
          className="text-3xl block mb-3"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        >
          {f.icon}
        </motion.span>
        <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
      </motion.div>
    ))}
  </div>
);

export default FeatureCards;
