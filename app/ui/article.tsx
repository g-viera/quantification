import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export default async function Article({ article }) {

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(article.prose);

  return (
    <div>
      <h1>article.title</h1>
      <p>article.date</p>
      <p>article.author</p>
      <div dangerouslySetInnerHTML={{ __html: file.value }}></div>
    </div>
  );
}