"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { portfolio } from "@/data/content";

const certEmojis = ["🐍", "⚛️", "🚀", "⚙️", "🛡️", "☁️", "📊", "🧪"];

export function Certificates() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
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
              <span className="gradient-text">Certificates</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Professional certifications and achievements
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.certifications.map((cert, index) => (
              <motion.div
                key={`${cert.title}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredId(index)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group relative"
              >
                <div className="relative rounded-2xl glass overflow-hidden hover:border-purple-500/30 transition-colors">
                  {/* Certificate Visual */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/25 via-blue-600/15 to-cyan-500/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={
                          hoveredId === index
                            ? { rotateY: 180 }
                            : { rotateY: 0 }
                        }
                        transition={{ duration: 0.6 }}
                        className="text-center"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <motion.div
                          className="text-5xl mb-2"
                          animate={hoveredId === index ? { scale: 1.15 } : { scale: 1 }}
                        >
                          {certEmojis[index % certEmojis.length]}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === index ? 1 : 0 }}
                      className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center"
                    >
                      <span className="px-4 py-2 rounded-full glass text-sm font-medium text-white/80">
                        {cert.issuer}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm mb-1 line-clamp-2">{cert.title}</h3>
                    <p className="text-xs text-white/60">{cert.issuer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
