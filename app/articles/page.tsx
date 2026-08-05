import type { Metadata } from "next";
import ArticleArchive from "@/components/articles/ArticleArchive";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Articles — Mohammad Sheakh",
  description:
    "Backend engineering articles, system design notes, and practical development guides by Mohammad Sheakh.",
};

export default function ArticlesPage() {
  return (
    <>
      <Nav />
      <ArticleArchive />
      <ScrollToTop />
    </>
  );
}
