import { notFound } from "next/navigation";
import { oswald } from "@ui/fonts";
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
      <h1 className={`${oswald.className} antialiased text-3xl font-medium`}>{article.title}</h1>
      <p>{article.preview}</p>
      <div>{article.content}</div>
    </main>
  );
}