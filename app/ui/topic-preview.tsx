import Link from 'next/link';
import { inter } from '@app/ui/fonts';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export default async function TopicPreview({ topic }) {

  const aboutFile = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(topic.about);

  const numberOfarticles = topic.articleSegs.length;

  return (
    <div>
      <Link href={`/${topic.topicSeg}`}>
        <h2 className={`${inter.className} antialiased text-lg font-semibold`}>
          {topic.title}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: aboutFile.value }}></div>
        <p>
          {`${numberOfarticles} articles`}
        </p>
      </Link>
    </div>
  );
}