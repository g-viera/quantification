import { notFound } from "next/navigation";
import Article from "@app/ui/article";
import { TopicInfo } from "@app/lib/types";
import { getTopics, getTopic, getArticle } from "@app/lib/api";

export async function generateStaticParams() {
  const topics: TopicInfo[] = getTopics();
  const params: { topicId: string; articleId: string }[] = [];
  for (const topic of topics) {
    for (const { articleId } of topic.articleIds) {
      params.push({ topicId: topic.topicId, articleId: articleId });
    }
  }

  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ topicId: string; articleId: string }>;
}) {
  // Next.js calls this function for each article. Each article
  // corresponds to a unique combination of topicId and articleId.
  // Get topic and article data and construct the article's html page.
  const { topicId, articleId } = await params;
  const topic = getTopic(topicId);
  if (!topic) {
    notFound();
  }
  const article = getArticle(topicId, articleId);
  if (!article) {
    notFound();
  }

  return (
    <main>
      <Article topic={topic} article={article} />
    </main>
  );
}
