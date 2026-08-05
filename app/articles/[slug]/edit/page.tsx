import { redirect } from "next/navigation";

export default function EditArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/articles/${params.slug}?edit=true`);
}
