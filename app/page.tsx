import About from "@app/ui/about";
import TopicPreview from "@app/ui/topic-preview";
import { site, topics } from "@app/lib/data";

export default async function Page() {
  const listItems = [];
  for (const topic of topics) {
    const articles = topic.articleSegs;
    listItems.push(
      <li key={topic.topicSeg}>
        <TopicPreview
          title={topic.title}
          text={topic.preview}
          articles={articles.length}
        />
      </li>
    );
  }
  return (
    <main>
      <About content={site.about} />
      <div>
        <ul>{listItems}</ul>
      </div>
    </main>
  );
}