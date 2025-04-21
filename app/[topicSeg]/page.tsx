import { notFound } from "next/navigation";
import ArticlePreview from "@app/ui/article-preview";
import { getSite, getTopic, getArticle } from "@lib/data";
import { oswald } from "@ui/fonts"

export async function generateStaticParams() {
  return (await getSite()).topicSegs;
}

export default async function Page({
  params,
}: {
  params: Promise<{ topicSeg: string }>
}) {

  // Get topic information to build the topic page
  // corresponding to the passed slag parameter.
  const { topicSeg } = await params;
  const topic = await getTopic(topicSeg);
  if (!topic) {
    notFound();
  }

  // Get article previews for this topic.
  const articlePreviews = [];
  for (const { articleSeg } of topic.articleSegs) {
    const article = await getArticle(topicSeg, articleSeg);
    articlePreviews.push(
    <div key={articleSeg}>
      <ArticlePreview article={article} />
    </div>);
  }

  return (
    <main>
      <h1 className={`${oswald.className} antialiased text-3xl font-medium`}>{topic.title}</h1>
      <p>{topic.preview}</p>
      <div>{articlePreviews}</div>
    </main>
  );
}