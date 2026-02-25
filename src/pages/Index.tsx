import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { analyzePersonality, type PersonalityResult } from "@/lib/analyzePersonality";
import ResultSection from "@/components/ResultSection";
import TraitBar from "@/components/TraitBar";
import FeatureCards from "@/components/FeatureCards";
import heroBg from "@/assets/hero-bg.jpg";
import traitsImg from "@/assets/traits-illustration.jpg";
import journalImg from "@/assets/journal-illustration.jpg";

const Index = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = () => {
    if (text.trim().length < 20) return;
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzePersonality(text));
      setIsAnalyzing(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section with BG image */}
      <header className="relative min-h-[85vh] flex items-center justify-center px-6">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        {/* Floating decorative orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] w-32 h-32 rounded-full bg-primary/10 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-[10%] w-40 h-40 rounded-full bg-accent/10 blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
          >
            ✦ Personality Reflection ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-8 font-display"
          >
            Discover the story{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="italic text-primary block mt-2"
            >
              within you
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Write a short description of yourself and receive thoughtful
            insights into your personality, strengths, and growth areas.
          </motion.p>

          <motion.a
            href="#write"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide glow-shadow cursor-pointer"
          >
            Begin Your Reflection
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </motion.a>
        </motion.div>
      </header>

      {/* Feature Cards */}
      <section className="py-20 md:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-display font-semibold text-center mb-12 text-foreground"
        >
          What you'll discover
        </motion.h2>
        <FeatureCards />
      </section>

      {/* Input Section */}
      <section id="write" className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Decorative journal image */}
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute -top-16 -right-8 w-28 h-28 rounded-2xl overflow-hidden opacity-30 hidden md:block animate-float"
          >
            <img src={journalImg} alt="" className="w-full h-full object-cover" />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
            Tell us about yourself
          </h2>
          <p className="text-muted-foreground mb-6">
            Describe your values, interests, how you relate to others — anything that feels true to you.
          </p>

          <div className="relative">
            <textarea
              id="self-description"
              value={text}
              onChange={e => setText(e.target.value)}
              rows={7}
              placeholder="I'm someone who loves exploring new ideas and connecting with people. I value honesty and creativity, and I tend to overthink things sometimes…"
              className="w-full rounded-2xl border border-input bg-card/80 backdrop-blur-sm p-6 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body text-base leading-relaxed transition-all duration-300 focus:glow-shadow"
            />
            {/* Shimmer line on focus */}
            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-center justify-between mt-5">
            <span className="text-xs text-muted-foreground font-medium">
              {text.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <motion.button
              onClick={handleAnalyze}
              disabled={text.trim().length < 20 || isAnalyzing}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed glow-shadow transition-all duration-300"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                  Reflecting…
                </span>
              ) : (
                "✦ Reflect"
              )}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-14"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-wide mb-5"
              >
                ✦ Analysis Complete
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
                Your Reflection
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">Here's what your words reveal about you</p>
            </motion.div>

            <div className="space-y-5">
              <ResultSection title="Personality Traits" icon="🧭" delay={0} illustration={traitsImg}>
                {result.traits.map((t, i) => (
                  <TraitBar key={t.name} {...t} delay={i * 0.12} />
                ))}
              </ResultSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ResultSection title="Communication Style" icon="💬" delay={0.1}>
                  <p className="text-sm sm:text-base">{result.communicationStyle}</p>
                </ResultSection>

                <ResultSection title="Strengths" icon="✦" delay={0.15}>
                  <ul className="space-y-2.5">
                    {result.strengths.map((s, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-sm sm:text-base"
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold mt-0.5 flex-shrink-0">{i + 1}</span>
                        <span>{s}</span>
                      </motion.li>
                    ))}
                  </ul>
                </ResultSection>
              </div>

              <ResultSection title="Growth Areas" icon="🌱" delay={0.2} illustration={journalImg}>
                <ul className="space-y-2.5">
                  {result.growthAreas.map((g, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-sm sm:text-base"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/15 text-accent text-[10px] font-bold mt-0.5 flex-shrink-0">{i + 1}</span>
                      <span>{g}</span>
                    </motion.li>
                  ))}
                </ul>
              </ResultSection>

              <ResultSection title="Reflection Questions" icon="🪞" delay={0.25}>
                <ol className="space-y-4">
                  {result.reflectionQuestions.map((q, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="flex gap-3 text-sm sm:text-base"
                    >
                      <span className="text-primary font-semibold font-display text-lg">{i + 1}.</span>
                      <span className="text-foreground/80 leading-relaxed">{q}</span>
                    </motion.li>
                  ))}
                </ol>
              </ResultSection>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 rounded-2xl bg-muted/50 border border-border/50 p-6 text-sm text-muted-foreground leading-relaxed"
            >
              <p className="font-medium text-foreground mb-2 font-display">⚠️ Disclaimer</p>
              <p>
                This analysis is AI-generated and based solely on the provided text. It is not a psychological assessment or clinical diagnosis. For professional evaluation, consult a licensed psychologist.
              </p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="text-center py-12 text-sm text-muted-foreground border-t border-border/50">
        <p>Made with ✦ for self-discovery</p>
      </footer>
    </div>
  );
};

export default Index;
