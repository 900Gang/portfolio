"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Rocket, Code, GitBranch } from "lucide-react";
import { portfolio } from "@/data/content";

const iconMap = [Trophy, Code, Rocket, GitBranch];

export function Achievements() {
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

  const achievements = portfolio.achievements.length
    ? portfolio.achievements
    : ["Building impactful projects", "Continuous learning journey", "Problem-solving mindset"];

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Achievements</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Milestones and accomplishments along my journey
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = iconMap[index % iconMap.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <div className="h-full rounded-2xl glass p-6 hover:border-purple-500/30 transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>

                    <p className="text-white/80 leading-relaxed">{achievement}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
