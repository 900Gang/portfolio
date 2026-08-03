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
      whileHover={{ scale: 1.08, y: -2 }}
      className="px-4 py-2 rounded-full glass text-sm font-medium text-white/80 hover:border-purple-500/50 hover:text-white transition-colors cursor-default"
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full p-6 rounded-2xl text-left transition-all duration-300",
        isActive
          ? "glass border-purple-500/50 bg-gradient-to-br from-purple-600/10 to-cyan-500/10"
          : "glass hover:border-white/20"
      )}
    >
      <h3 className="text-xl font-semibold mb-4">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.slice(0, 6).map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/70"
          >
            {skill}
          </span>
        ))}
        {skills.length > 6 && (
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/50">
            +{skills.length - 6} more
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
      className="relative py-24 sm:py-32 overflow-hidden"
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              My <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Technologies and tools I&apos;ve worked with to build scalable applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            transition={{ duration: 0.5 }}
            className="mt-12 p-8 rounded-3xl glass"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              {activeLabel} Skills
            </h3>

            {/* Skill Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {activeSkills.map((skill, index) => (
                <SkillPill key={skill} name={skill} index={index} />
              ))}
            </div>

            {/* Progress Bars */}
            <div className="grid sm:grid-cols-2 gap-6">
              {activeSkills.map((skill, index) => (
                <div key={skill} className="p-6 rounded-xl glass">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{skill}</span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      className="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500"
                    >
                      {skillLevels[skill] ?? 75}%
                    </motion.span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skillLevels[skill] ?? 75}%` }}
                      transition={{ duration: 1.2, delay: index * 0.1 }}
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
