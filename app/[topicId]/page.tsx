import { notFound } from "next/navigation";
import PageTitle from "@app/ui/page-title";
import TopicIntro from "@app/ui/topic-intro";
import ArticlePreviews from "@app/ui/article-previews";
import { getTopics, getTopic, getArticle } from "@app/lib/api";

export async function generateStaticParams() {
  const topics = getTopics();
  const params: { topicId: string }[] = [];
  for (const topic of topics) {
    params.push({ topicId: topic.topicId });
  }
  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) {
    notFound();
  }

  // Get articles for this topic.
  const articles = [];
  for (const { articleId } of topic.articleIds) {
    const article = getArticle(topicId, articleId);
    if (!article) {
      notFound();
    }
    articles.push(article);
  }

  // Return html for this particular topic.
  return (
    <main>
      <PageTitle title={topic.title} />
      <TopicIntro introHtml={topic.introHtml} />
      <ArticlePreviews articles={articles} />
    </main>
  );
}
