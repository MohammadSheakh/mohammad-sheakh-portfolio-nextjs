import type { Metadata } from "next";
import ArticleEditor from "@/components/articles/ArticleEditor";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Create Article — Mohammad Sheakh",
};

export default function NewArticlePage() {
  return (
    <>
      <Nav />
      <ArticleEditor />
    </>
  );
}
