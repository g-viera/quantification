import Link from "next/link";
import { inter } from "@app/ui/fonts";

export default async function TopicPreview({ topic }) {
  return (
    <div className="mb-8">
      <Link
        href={`/${topic.topicId}`}
        title={`Open '${topic.title}' topic.`}
      >
        <h2 className={`${inter.className} antialiased text-3xl font-medium`}>
          {topic.title}
        </h2>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: topic.previewHtml }}></div>
      <p className="text-gray-500 text-sm">{`(${topic.articleIds.length} articles)`}</p>
    </div>
  );
}
