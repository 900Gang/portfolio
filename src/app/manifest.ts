import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anand N | Software Engineer",
    short_name: "Anand",
    description:
      "Portfolio of Anand N - Full Stack Developer specializing in Python, Django, React, DevOps, AI, and Cloud Technologies.",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#8b5cf6",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
