import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from "remark-frontmatter";
import extractFrontmatter from "remark-extract-frontmatter";
import yaml from "yaml";
import { unified } from 'unified';

// Path to content.
const content = path.join(process.env.QUANT, "content");

export interface Site {
  name: string,
  owner: string,
  topicSegs: { topicSeg: string }[],
  about: string,
};

export interface Topic {
  topicSeg: string,
  title: string,
  preview: string,
  articleSegs: { articleSeg: string }[],
  about: string,
};

export interface Article {
  topicSeg: string,
  articleSeg: string,
  title: string,
  date: string,
  author: string,
  preview: string,
  content: string,
};

async function getSite(): Promise<Site> {

  const sitePath = path.join(content, "site.md");

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(fs.readFileSync(sitePath, "utf-8"));
  const data = file.data;

  return {
    name: (data.name as string),
    owner: (data.owner as string),
    topicSegs: (data.topicSegs as { topicSeg: string }[]),
    about: file.toString(),
  };
}
export const site: Site = await getSite();

async function getTopics(): Promise<Topic[]> {
  const result = [];
  for (const { topicSeg } of site.topicSegs) {
    const str = fs.readFileSync(path.join(content, topicSeg, "topic.md"));
    const file = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(str);
    const topic = file.data;
    const about = String(file);
    result.push({
      topicSeg: topicSeg,
      title: (topic.title as string),
      preview: (topic.preview as string),
      articleSegs: (topic.articleSegs as { articleSeg: string }[]),
      about: (about as string),
    });
  }
  return result;
}
export const topics: Topic[] = await getTopics();

export async function getTopic(topicSeg: string): Promise<Topic> {
  const topicPath = path.join(
    content,
    topicSeg,
    "topic.md"
  );

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(fs.readFileSync(topicPath, "utf-8"));
  const data = file.data;

  return {
    topicSeg: topicSeg,
    title: data.title as string,
    preview: data.preview as string,
    articleSegs: data.articleSegs as { articleSeg: string }[],
    about: String(file),
  };
}

export async function getArticle(topicSeg: string, articleSeg: string): Promise<Article> {
  const articlePath = path.join(
    content,
    topicSeg,
    articleSeg,
    "article.md"
  );

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(fs.readFileSync(articlePath, "utf-8"));
  const data = file.data;

  return {
    topicSeg: topicSeg,
    articleSeg: articleSeg,
    title: data.title as string,
    date: data.date as string,
    author: data.author as string,
    preview: data.preview as string,
    content: file.toString(),
  };
}

export function getArticleSegs(): { topicSeg: string, articleSeg: string }[] {
  const articleSegs = [];
  for (const topic of topics) {
    for (const { articleSeg } of topic.articleSegs) {
      articleSegs.push({
        topicSeg: topic.topicSeg,
        articleSeg: articleSeg,
      });
    }
  }
  return articleSegs;
}