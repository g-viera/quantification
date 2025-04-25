import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export default async function SiteAbout({ aboutMarkdown }) {

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(aboutMarkdown);

  return (
    <div className="mb-8"  dangerouslySetInnerHTML={{ __html: file.value }}></div>
  );
}