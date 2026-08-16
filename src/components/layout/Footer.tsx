"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { portfolio } from "@/data/content";
import { Button } from "@/components/ui/button";

export function Footer() {
  const socialLinks = [
    { icon: GithubIcon, href: portfolio.social.github, label: "GitHub" },
    { icon: LinkedinIcon, href: portfolio.social.linkedin, label: "LinkedIn" },
    { icon: Mail, href: portfolio.social.email, label: "Email" },
  ].filter((link) => link.href);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
    <footer className="relative bg-gradient-to-b from-transparent via-background/50 to-background border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <Link
              href="#home"
              className="inline-flex items-center gap-2 group"
            >
              <Image
                src="/brand/nanomachine-wordmark.png"
                alt="NanoMachine"
                width={180}
                height={48}
                className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Building scalable web applications and modern solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <div className="space-y-2">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Blog", href: "#blog" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <div className="space-y-2">
              {[
                { name: "Resume", href: "/ANAND_N_resume_ATS_New.pdf" },
                { name: "GitHub", href: portfolio.social.github },
                { name: "LinkedIn", href: portfolio.social.linkedin },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Contact" ? "_blank" : undefined}
                  rel={link.name !== "Contact" ? "noopener noreferrer" : undefined}
                  className="block text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social & CTA */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white/70 hover:text-white hover:border-purple-500/50 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={20} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <Button size="sm" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"
        />

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <motion.p variants={itemVariants} className="text-sm text-white/50">
            © {new Date().getFullYear()} {portfolio.personal.name}. All rights reserved.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/50 hover:text-white/70 transition-colors"
            >
              Built with Next.js
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/50 hover:text-white/70 transition-colors"
            >
              Deployed on Vercel
            </a>
          </motion.div>

          <motion.button
            variants={itemVariants}
            onClick={handleScrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white/70 hover:text-white hover:border-purple-500/50 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
      </div>
    </footer>
  );
}
