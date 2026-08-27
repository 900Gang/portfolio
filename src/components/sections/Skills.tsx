"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { portfolio } from "@/data/content";
import { cn } from "@/lib/utils";

type SkillMap = Record<string, string[]>;

// Estimated proficiency for each skill (keeps the animated progress bars meaningful)
const skillLevels: Record<string, number> = {
  HTML5: 95, CSS3: 90, JavaScript: 90, TypeScript: 85, React: 85, "Next.js": 80,
  "Tailwind CSS": 90, Bootstrap: 85, Python: 95, Django: 90, "Node.js": 75,
  "Express.js": 70, "REST API": 90, MySQL: 85, PostgreSQL: 80, MongoDB: 75,
  Firebase: 70, Git: 90, GitHub: 90, Linux: 80, Docker: 70, AWS: 65, Jenkins: 60,
  Terraform: 55, Ansible: 55, Kubernetes: 50, "Manual Testing": 80, "SQL Testing": 80,
  SQL: 85, PHP: 60, "Machine Learning": 70, "Computer Vision": 65, OpenCV: 65,
  TensorFlow: 60,
};

const categories: { key: keyof SkillMap; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "devops", label: "DevOps" },
  { key: "testing", label: "Testing" },
  { key: "programming", label: "Programming" },
  { key: "ai", label: "AI & ML" },
];

function SkillPill({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1, y: -2 }}
      className="px-4 py-2 rounded-lg glass text-xs sm:text-sm font-medium text-white/85 hover:text-white hover:border-purple-400/50 transition-all duration-200 cursor-default"
    >
      {name}
    </motion.span>
  );
}

function SkillCard({
  category,
  skills,
  isActive,
  onClick,
}: {
  category: string;
  skills: string[];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full p-6 rounded-2xl text-left transition-all duration-200",
        isActive
          ? "glass border-purple-500/50 bg-gradient-to-br from-purple-600/15 to-cyan-500/15 shadow-glow"
          : "glass hover:border-white/30 hover:bg-white/5"
      )}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.slice(0, 5).map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-white/8 text-white/75 hover:bg-white/12 transition-colors"
          >
            {skill}
          </span>
        ))}
        {skills.length > 5 && (
          <span className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-white/5 text-white/50">
            +{skills.length - 5}
          </span>
        )}
      </div>
    </motion.button>
  );
}

export function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<keyof SkillMap>("frontend");

  const skillMap = portfolio.skills as SkillMap;

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

  const activeSkills = skillMap[activeCategory] || [];
  const activeLabel = categories.find((c) => c.key === activeCategory)?.label || activeCategory;

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
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
              My <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/60 max-w-2xl mx-auto px-4">
              Technologies and tools I&apos;ve worked with to build scalable applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {categories.map((cat) => (
              <SkillCard
                key={cat.key}
                category={cat.label}
                skills={skillMap[cat.key] || []}
                isActive={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
              />
            ))}
          </div>

          {/* Detailed View for Active Category */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 p-6 sm:p-8 lg:p-10 rounded-3xl glass"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-white">
              {activeLabel} Skills
            </h3>

            {/* Skill Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              {activeSkills.map((skill, index) => (
                <SkillPill key={skill} name={skill} index={index} />
              ))}
            </div>

            {/* Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {activeSkills.map((skill, index) => (
                <div key={skill} className="p-4 sm:p-5 rounded-xl glass hover:bg-white/8 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-sm sm:text-base">{skill}</span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05, type: "spring" }}
                      className="text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500"
                    >
                      {skillLevels[skill] ?? 75}%
                    </motion.span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skillLevels[skill] ?? 75}%` }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
