import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";
import TimelineExplorer from "@/components/timeline/TimelineExplorer";

export const metadata: Metadata = {
  title: "Timeline — Mohammad Sheakh",
  description:
    "A timeline of Mohammad Sheakh's backend development work, learning, and career milestones.",
};

export default function TimelinePage() {
  return (
    <>
      <Nav />
      <TimelineExplorer />
      <ScrollToTop />
    </>
  );
}
