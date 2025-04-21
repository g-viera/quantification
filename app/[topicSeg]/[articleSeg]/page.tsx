import { notFound } from "next/navigation";
import { oswald } from "@app/ui/fonts";
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
      <article>
      <h1 className={`${oswald.className} antialiased text-3xl font-medium`}>{article.title}</h1>
      <Article article={article} />
      </article>
    </main>
  );
}