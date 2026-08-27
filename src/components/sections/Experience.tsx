"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { portfolio } from "@/data/content";
import { cn } from "@/lib/utils";

export function Experience() {
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

  // Build a unified timeline from education + experience
  const timeline = [
    ...portfolio.education.map((edu) => ({
      id: `edu-${edu.institution}`,
      title: edu.degree,
      subtitle: `${edu.field} · ${edu.institution}`,
      location: edu.location,
      duration: edu.duration,
      description: [edu.description],
      icon: GraduationCap,
    })),
    ...portfolio.experience.map((exp) => ({
      id: `exp-${exp.role}-${exp.company}`,
      title: exp.role,
      subtitle: exp.company,
      location: "",
      duration: exp.duration,
      description: typeof exp.description === "string" ? [exp.description] : exp.description,
      icon: Briefcase,
    })),
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
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
              Experience &amp; <span className="gradient-text">Education</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600 via-blue-600 to-cyan-500" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 ring-4 ring-background" />

                  {/* Content Card */}
                  <div className="ml-16 md:ml-0 md:w-1/2">
                    <div
                      className={cn(
                        "glass rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-200",
                        index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                      )}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold line-clamp-2">{item.title}</h3>
                          <p className="text-purple-400 font-medium text-sm mt-1">{item.subtitle}</p>
                        </div>
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                          <item.icon className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/60">
                        {item.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {item.duration}
                        </span>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2">
                        {item.description.map((desc, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-white/70 leading-relaxed"
                          >
                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-purple-400 mt-2" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
