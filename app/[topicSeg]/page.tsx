import { notFound } from "next/navigation";
import PageTitle from "@app/ui/page-title";
import TopicAbout from "@app/ui/topic-about";
import ArticlePreviews from "@app/ui/article-previews";
import { getSite, getTopic, getArticle } from "@lib/data";

export async function generateStaticParams() {
  return (await getSite()).topicSegs;
}

export default async function Page({
  params,
}: {
  params: Promise<{ topicSeg: string }>
}) {

  const { topicSeg } = await params;
  const topic = await getTopic(topicSeg);
  if (!topic) {
    notFound();
  }

  // Get article previews for this topic.
  const articles = [];
  for (const { articleSeg } of topic.articleSegs) {
    const article = await getArticle(topicSeg, articleSeg);
    articles.push(article);
  }

  return (
    <main>
      <PageTitle title={topic.title} />
      <TopicAbout aboutMarkdown={topic.about} />
      <ArticlePreviews articles={articles} />
    </main>
  );
}