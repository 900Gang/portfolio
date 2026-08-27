"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { portfolio } from "@/data/content";

function AnimatedStat({ value }: { value: string }) {
  // Extract numeric prefix + suffix (e.g. "10+" -> 10 and "+", "Every Day" -> no number)
  const match = value.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && num !== null) {
      const duration = 1800;
      const steps = 50;
      const stepValue = num / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= num) {
          setCount(num);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, num]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold gradient-text">
      {num === null ? value : `${count}${suffix}`}
    </span>
  );
}

export function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const education = portfolio.education[0];
  const highlights = portfolio.about.highlights.slice(0, 4);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Decorative rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl border border-white/10"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-3xl border border-purple-500/20"
                />

                {/* Main card */}
                <div className="absolute inset-8 rounded-3xl glass overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-500/20 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-7xl mb-4">👨‍💻</span>
                    <p className="font-bold text-lg">{portfolio.personal.name}</p>
                    <p className="text-sm text-white/60 mt-1">{portfolio.personal.title}</p>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-full glass text-sm font-medium"
                >
                  Python ⚡
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full glass text-sm font-medium"
                >
                  React ⚛️
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-semibold leading-tight">
                {portfolio.personal.subtitle}
              </h3>

              <div className="space-y-4 text-white/70 text-base leading-relaxed whitespace-pre-line">
                {portfolio.about.description}
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
                      <span className="text-sm leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Education card */}
              {education && (
                <div className="p-5 rounded-2xl glass flex items-start gap-3 hover:border-purple-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-snug">
                      {education.degree} · {education.field}
                    </p>
                    <p className="text-sm text-white/60 mt-1 leading-snug">
                      {education.institution} · {education.duration}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {portfolio.about.stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.02, y: -2 }}
                className="text-center p-6 rounded-2xl glass hover:border-purple-500/30 transition-all duration-200"
              >
                <AnimatedStat value={stat.value} />
                <p className="text-white/60 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
