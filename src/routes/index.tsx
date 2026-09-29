import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ankitha KS — Web Developer Portfolio" },
      { name: "description", content: "Portfolio of Ankitha KS: web development projects, skills, and contact information." },
      { property: "og:title", content: "Ankitha KS — Web Developer Portfolio" },
      { property: "og:description", content: "Web projects and creative development work by Ankitha KS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
