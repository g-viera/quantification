import { notFound } from "next/navigation";
import Article from "@app/ui/article";
import { getArticleSegs, getArticle } from "@app/lib/data";

export async function generateStaticParams() {
  // Returns a list of objects of the form { topicSeg, articleSeg }.
  // Next.js calls this function when generating the page 
  // for each article.
  return getArticleSegs();
}

export default async function Page({
  params,
}: {
  params: Promise<{ topicSeg: string, articleSeg: string }>
}) {
  // Next.js calls this function for each article. Each article
  // corresponds to a unique combination of topicSef and 
  // articleSeg. Get article data and construct the article's html.
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