import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Projects — Mohammad Sheakh",
  description:
    "Explore backend platforms, real-time systems, marketplaces, and production projects built by Mohammad Sheakh.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <ProjectsExplorer />
      <ScrollToTop />
    </>
  );
}
