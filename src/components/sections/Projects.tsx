"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Search, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";
import { portfolio } from "@/data/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const projectEmojis = ["🧠", "🌐", "🤖", "📦", "⚙️", "📱"];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof portfolio.projects)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: -x * 10 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="group relative"
    >
      <div className="relative h-full rounded-2xl glass overflow-hidden">
        {/* Visual */}
        <div className="relative aspect-video overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-blue-600/30 to-cyan-500/40 transition-transform duration-500 group-hover:scale-110" />
          )}
          {!project.image && (
            <div className="absolute inset-0 bg-[#050816]/40 flex items-center justify-center">
              <motion.span
                animate={isHovered ? { scale: 1.2, rotate: 8 } : { scale: 1, rotate: 0 }}
                className="text-6xl drop-shadow-lg"
              >
                {projectEmojis[index % projectEmojis.length]}
              </motion.span>
            </div>
          )}

          {/* Overlay with actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent flex items-end p-6"
          >
            <div className="flex gap-3">
              {project.github && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-2"
                  onClick={() => window.open(project.github, "_blank")}
                >
                  <GithubIcon size={16} className="w-4 h-4" />
                  Code
                </Button>
              )}
              {project.live && (
                <Button
                  size="sm"
                  className="gap-2"
                  onClick={() => window.open(project.live, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <span className="shrink-0 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-600 to-cyan-500">
                Featured
              </span>
            )}
          </div>

          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/70"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/50">
                +{project.tech.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [showFeatured, setShowFeatured] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = portfolio.projects.filter((project) => {
    const matchesFeatured = !showFeatured || project.featured;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFeatured && matchesSearch;
  });

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
      id="projects"
      ref={containerRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px]" />
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
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              A collection of projects that showcase my skills and passion for building
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants} className="mb-12 space-y-6">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setShowFeatured(false)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  !showFeatured
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                    : "glass hover:bg-white/10"
                )}
              >
                All Projects
              </button>
              <button
                onClick={() => setShowFeatured(true)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  showFeatured
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                    : "glass hover:bg-white/10"
                )}
              >
                ⭐ Featured
              </button>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl glass bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-white/40 hover:text-white" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/60">No projects found matching your criteria</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
