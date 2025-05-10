import { inter } from "@app/ui/fonts";
import Link from "next/link";

export default function ArticleHeader({ topic, article }) {
  return (
    <header className="mb-8">
      <div>
        <Link href={`/${topic.topicId}`} title={`Back to '${topic.title}' topic page.`}>
          <div
            className={`${inter.className} antialiased mb-8 font-medium text-center`}
          >
            <span className="text-4xl">{topic.title}</span>
          </div>
        </Link>
        <div className={`${inter.className} antialiased font-medium`}>
          <h1 className="text-3xl">{article.title}</h1>
        </div>
      </div>
      <div>
        <span className="text-gray-400 text-sm">
          {article.date}, {article.author}
        </span>
      </div>
    </header>
  );
}
