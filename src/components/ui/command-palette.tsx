"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import {
  Home,
  User,
  Code,
  Briefcase,
  Folder,
  Award,
  FileText,
  Trophy,
  Mail,
  Moon,
  Sun,
  Download,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { portfolio } from "@/data/content";

const actions = [
  { id: "home", label: "Go to Home", icon: Home, href: "#home" },
  { id: "about", label: "Go to About", icon: User, href: "#about" },
  { id: "skills", label: "Go to Skills", icon: Code, href: "#skills" },
  { id: "experience", label: "Go to Experience", icon: Briefcase, href: "#experience" },
  { id: "projects", label: "Go to Projects", icon: Folder, href: "#projects" },
  { id: "certificates", label: "Go to Certificates", icon: Award, href: "#certificates" },
  { id: "blog", label: "Go to Blog", icon: FileText, href: "#blog" },
  { id: "achievements", label: "Go to Achievements", icon: Trophy, href: "#achievements" },
  { id: "contact", label: "Go to Contact", icon: Mail, href: "#contact" },
  { id: "download", label: "Download Resume", icon: Download, href: "/ANAND_N_resume_ATS_New.pdf" },
  { id: "github", label: "Open GitHub", icon: GithubIcon, href: portfolio.social.github, external: true },
  { id: "linkedin", label: "Open LinkedIn", icon: LinkedinIcon, href: portfolio.social.linkedin, external: true },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Toggle command palette with Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Close on Escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
          >
            <Command
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center border-b border-white/10 px-4">
                <Command.Input
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent py-4 text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>

              {/* Results List */}
              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-white/40">
                  No results found.
                </Command.Empty>

                {/* Navigation Commands */}
                <Command.Group heading="Navigation" className="px-2 py-2">
                  {actions.slice(0, 9).map((action) => (
                    <Command.Item
                      key={action.id}
                      value={action.label}
                      onSelect={() => {
                        runCommand(() => {
                          if (action.external) {
                            window.open(action.href, "_blank");
                          } else {
                            const element = document.querySelector(action.href);
                            element?.scrollIntoView({ behavior: "smooth" });
                          }
                        });
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/70 aria-selected:bg-white/10 aria-selected:text-white"
                    >
                      <action.icon className="w-4 h-4 text-purple-400" />
                      <span>{action.label}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Quick Actions */}
                <Command.Group heading="Quick Actions" className="px-2 py-2">
                  <Command.Item
                    value="toggle theme"
                    onSelect={() => runCommand(toggleTheme)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/70 aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-purple-400" />
                    )}
                    <span>Toggle Theme</span>
                  </Command.Item>

                  <Command.Item
                    value="download resume"
                    onSelect={() => {
                      window.open("/ANAND_N_resume_ATS_New.pdf", "_blank");
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/70 aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Download Resume</span>
                  </Command.Item>
                </Command.Group>

                {/* Social Links */}
                <Command.Group heading="Social" className="px-2 py-2">
                  <Command.Item
                    value="open github"
                    onSelect={() => runCommand(() => window.open(portfolio.social.github, "_blank"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/70 aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <GithubIcon size={16} className="w-4 h-4" />
                    <span>Open GitHub</span>
                  </Command.Item>

                  <Command.Item
                    value="open linkedin"
                    onSelect={() => runCommand(() => window.open(portfolio.social.linkedin, "_blank"))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/70 aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <LinkedinIcon size={16} className="w-4 h-4 text-blue-400" />
                    <span>Open LinkedIn</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-xs text-white/40">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10">↵</kbd>
                    select
                  </span>
                </div>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">Esc</kbd>
                  close
                </span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
