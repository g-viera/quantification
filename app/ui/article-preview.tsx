import Link from "next/link";
import { inter } from "@app/ui/fonts";

export default async function ArticlePreview({ article }) {
  return (
    <div className="mb-8">
      <Link
        href={`/${article.topicId}/${article.articleId}`}
        title={`Open '${article.title}' article.`}
      >
        <h2 className={`${inter.className} antialiased text-3xl font-medium`}>
          {article.title}
        </h2>
      </Link>
      <div>
        <span className="text-gray-400 text-sm">{`${article.date}, ${article.author}`}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: article.previewHtml }}></div>
    </div>
  );
}
