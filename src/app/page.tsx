import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Blog } from "@/components/sections/Blog";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { AnimatedBackground } from "@/components/animations/Background";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { CommandPalette } from "@/components/ui/command-palette";
import { getAllPosts } from "@/lib/mdx";

export default async function Home() {
  const posts = getAllPosts().slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
  }));

  return (
    <main className="relative min-h-screen bg-background">
      {/* Smooth Scroll Wrapper */}
      <SmoothScroll>
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Command Palette */}
        <CommandPalette />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <div className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Blog posts={posts} />
          <Achievements />
          <Contact />
        </div>

        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </main>
  );
}
