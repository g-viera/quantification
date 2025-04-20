import { notFound } from "next/navigation";
import ArticlePreview from "@app/ui/article-preview";
import { site, Topic, getTopic, Article, getArticle } from "@lib/data";
import { oswald } from "@ui/fonts"

export async function generateStaticParams() {
  // This is called by next.js to build the pages for 
  // the [topicSeg] dynamic route. It uses the values returned
  // to call the Page() component with a topicSeg value as an 
  // argument so the component can build the page for the 
  // corresponding route.
  return site.topicSegs;
}

export default async function Page({
  params,
}: {
  params: Promise<{ topicSeg: string }>
}) {

  // Get topic information to build the topic page
  // corresponding to the passed slag parameter.
  const { topicSeg } = await params;
  const topic: Topic = await getTopic(topicSeg);
  if (!topic) {
    notFound();
  }

  // Get article previews for this topic.
  const listItems = [];
  for (const { articleSeg } of topic.articleSegs) {
    const article: Article = await getArticle(topicSeg, articleSeg);
    listItems.push(<li key={articleSeg}>
      <ArticlePreview
        title={article.title}
        text={article.preview}
        date={article.date}
      />
    </li>);
  }

  return (
    <main>
      <h1 className={`${oswald.className} antialiased text-3xl font-medium`}>{topic.title}</h1>
      <p>{topic.preview}</p>
      <ul>{listItems}</ul>
    </main>
  );
}