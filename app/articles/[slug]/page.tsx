import type { Metadata } from "next";
import ArticleReader from "@/components/articles/ArticleReader";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Article — Mohammad Sheakh",
};

export default function ArticlePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { edit?: string };
}) {
  return (
    <>
      <Nav />
      <ArticleReader slug={params.slug} initialEdit={searchParams?.edit === "true"} />
      <ScrollToTop />
    </>
  );
}
