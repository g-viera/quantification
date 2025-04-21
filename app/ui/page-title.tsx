import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export default async function PageTitle({ titleMarkdown }) {


  // Add options to only allow <em>, <strong> html tags in title.
  // if necessary strip <p> tag.

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(titleMarkdown);

  return (
    <h1 dangerouslySetInnerHTML={{ __html: file.value }}></h1>
  );
}