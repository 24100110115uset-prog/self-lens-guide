import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzePersonality, type PersonalityResult } from "@/lib/analyzePersonality";
import ResultSection from "@/components/ResultSection";
import TraitBar from "@/components/TraitBar";

const Index = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (text.trim().length < 20) return;
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzePersonality(text));
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden py-20 md:py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto relative z-10"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Personality Reflection
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Discover the story <br />
            <span className="italic text-primary">within you</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Write a short description of yourself and receive thoughtful, AI-powered insights into your personality, strengths, and growth areas.
          </p>
        </motion.div>
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      </header>

      {/* Input Section */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label
            htmlFor="self-description"
            className="block text-sm font-medium text-muted-foreground mb-3"
          >
            Describe yourself in a paragraph — your values, interests, how you relate to others…
          </label>
          <textarea
            id="self-description"
            value={text}
            onChange={e => setText(e.target.value)}
            rows={6}
            placeholder="I'm someone who loves exploring new ideas and connecting with people. I value honesty and creativity, and I tend to overthink things sometimes…"
            className="w-full rounded-xl border border-input bg-card p-5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring resize-none font-[var(--font-body)] text-base leading-relaxed"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground">
              {text.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <button
              onClick={handleAnalyze}
              disabled={text.trim().length < 20 || isAnalyzing}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
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
                "Reflect"
              )}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto px-6 pb-24 space-y-6"
          >
            <ResultSection title="Personality Traits" icon="🧭" delay={0}>
              {result.traits.map((t, i) => (
                <TraitBar key={t.name} {...t} delay={i * 0.1} />
              ))}
            </ResultSection>

            <ResultSection title="Communication Style" icon="💬" delay={0.15}>
              <p>{result.communicationStyle}</p>
            </ResultSection>

            <ResultSection title="Strengths" icon="✦" delay={0.3}>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </ResultSection>

            <ResultSection title="Growth Areas" icon="🌱" delay={0.45}>
              <ul className="space-y-2">
                {result.growthAreas.map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {g}
                  </li>
                ))}
              </ul>
            </ResultSection>

            <ResultSection title="Reflection Questions" icon="🪞" delay={0.6}>
              <ol className="space-y-3 list-decimal list-inside">
                {result.reflectionQuestions.map((q, i) => (
                  <li key={i} className="text-foreground/80">{q}</li>
                ))}
              </ol>
            </ResultSection>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="rounded-xl bg-secondary/60 border border-border p-6 text-sm text-muted-foreground leading-relaxed"
            >
              <p className="font-medium text-foreground mb-2">⚠️ Disclaimer</p>
              <p>
                This analysis is AI-generated and based solely on the provided text. It is not a psychological assessment or clinical diagnosis. Results may not fully represent your personality. For professional evaluation, consult a licensed psychologist or mental health professional.
              </p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
