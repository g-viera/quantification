import { notFound } from "next/navigation";
import Article from "@app/ui/article";
import { getArticleSegs, getArticle } from "@app/lib/data";

export async function generateStaticParams() {
  return getArticleSegs();
}

export default async function Page({
  params,
}: {
  params: Promise<{
    topicSeg: string,
    articleSeg: string,
  }>
}) {
  const { topicSeg, articleSeg } = await params;
  const article = await getArticle(topicSeg, articleSeg);
  if (!article) {
    notFound();
  }

  return (
    <main>
      <Article article={article} />
    </main>
  );
}