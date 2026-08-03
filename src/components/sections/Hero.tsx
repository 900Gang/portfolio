"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GithubIcon, LinkedinIcon, LeetCodeIcon, GeeksForGeeksIcon } from "@/components/ui/social-icons";
import { portfolio } from "@/data/content";
import { Button } from "@/components/ui/button";

// Load the 3D scene only on the client (Three.js needs the browser and is heavy)
const HeroScene = dynamic(
  () => import("@/components/3d/Scene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null }
);

const socials = [
  { icon: GithubIcon, href: portfolio.social.github, label: "GitHub" },
  { icon: LinkedinIcon, href: portfolio.social.linkedin, label: "LinkedIn" },
  { icon: Mail, href: portfolio.social.email, label: "Email" },
  { icon: LeetCodeIcon, href: portfolio.social.leetcode, label: "LeetCode" },
  { icon: GeeksForGeeksIcon, href: portfolio.social.geeksforgeeks, label: "GeeksForGeeks" },
].filter((s) => s.href);

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const roles = portfolio.hero.roles;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typing animation — self-scheduling timeouts, no external state reads
  useEffect(() => {
    if (roles.length === 0) return;

    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = roles[titleIndex];

      if (!isDeleting) {
        charIndex++;
        setDisplayedText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          isDeleting = true;
          timeout = setTimeout(tick, 2000);
        } else {
          timeout = setTimeout(tick, 80);
        }
      } else {
        charIndex--;
        setDisplayedText(current.slice(0, charIndex));
        if (charIndex === 0) {
          setTitleIndex((i) => (i + 1) % roles.length);
          return; // effect re-runs on titleIndex change
        }
        timeout = setTimeout(tick, 40);
      }
    };

    timeout = setTimeout(tick, 100);
    return () => clearTimeout(timeout);
  }, [titleIndex, roles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 opacity-75 blur-sm"
                aria-hidden="true"
              />
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background">
                <Image
                  src="/profile_pic.jpg"
                  alt={`Profile picture of ${portfolio.personal.name}`}
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/60 mb-4"
          >
            {portfolio.hero.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="gradient-text">{portfolio.hero.name}</span>
          </motion.h1>

          {/* Animated Title */}
          <motion.div
            variants={itemVariants}
            className="h-12 sm:h-16 mb-8 flex items-center justify-center"
            aria-live="polite"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white/80">
              {displayedText}
              <span className="inline-block w-0.5 h-8 sm:h-10 bg-white/80 ml-1 animate-pulse" />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            {portfolio.personal.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button size="lg" className="group" asChild>
              <a href="/ANAND_N_resume_ATS_New.pdf" download>
                <Download className="w-4 h-4 mr-2 group-hover:translate-y-1 transition-transform" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4"
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:border-purple-500/50 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
