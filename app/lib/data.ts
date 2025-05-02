import { read } from 'to-vfile';
import { VFileData, VFileValue } from 'vfile';
import { reporter } from 'vfile-reporter';
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import yaml from "yaml";
import remarkParse from 'remark-parse';
import remarkFrontmatter from "remark-frontmatter";
import extractFrontmatter from "remark-extract-frontmatter";
import remarkStringify from "remark-stringify";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeMathJax from "rehype-mathjax/svg";
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from "rehype-slug";
import { unified } from 'unified';

// Path to content store.
const content = path.join(process.env.QUANT, "content");

/** Site metadata. */
export interface Site {
  name: string,
  title: string,
  owner: string,
  about: string,
  topicSegs: { topicSeg: string }[],
};

/** Topic metadata. */
export interface Topic {
  topicSeg: string,
  title: string,
  preview: string,
  about: string,
  articleSegs: { articleSeg: string }[],
};

/** Article metadata and content. */
export interface Article {
  topicSeg: string,
  articleSeg: string,
  title: string,
  date: string,
  author: string,
  preview: string,
  value: VFileValue,
};

/**
 * Returns object with site metadata and 
 * 'about site' content in markdown format.
 */
export async function getSite(): Promise<Site> {

  const sitePath = path.join(content, "site.md");

  // Extract yaml frontmatter as ts object.
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
    .use(remarkStringify)
    .process(fs.readFileSync(sitePath, "utf-8"));

  return {
    name: file.data.name as string,
    title: file.data.title as string,
    owner: file.data.owner as string,
    topicSegs: file.data.topicSegs as { topicSeg: string }[],
    about: file.value as string,
  };
}

/**
 * Returns list of objects with topic metadata and
 * 'about topic' content in markdown format.
 */
export async function getTopics(): Promise<Topic[]> {

  const topicSegs = (await getSite()).topicSegs;

  const topics = [];
  for (const { topicSeg } of topicSegs) {
    const topicPath = path.join(content, topicSeg, "topic.md");

    const file = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
      .use(remarkStringify)
      .process(fs.readFileSync(topicPath));

    topics.push({
      topicSeg: topicSeg,
      title: file.data.title as string,
      preview: file.data.preview as string,
      about: file.value as string,
      articleSegs: file.data.articleSegs as { articleSeg: string }[],
    });
  }

  return topics;
}

export async function getTopic(topicSeg: string): Promise<Topic> {

  const topicPath = path.join(content, topicSeg, "topic.md");

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
    .use(remarkStringify)
    .process(fs.readFileSync(topicPath, "utf-8"));

  return {
    topicSeg: topicSeg,
    title: file.data.title as string,
    preview: file.data.preview as string,
    about: file.value as string,
    articleSegs: file.data.articleSegs as { articleSeg: string }[],
  };
}

export async function getArticle(
  topicSeg: string,
  articleSeg: string
): Promise<Article> {

  const articlePath = path.join(content, topicSeg, articleSeg, "article.md");
  const file = await read(articlePath);

  // Spellcheck

  await unified()
    .use(remarkParse)
    // .use(remarkRetext, unified().use(retextEnglish).use(retextSpell, {
    //   dictionary: dictionaryEn,
    //   ignore: ['MathJax']
    // }).use(retextIndefiniteArticle))
    .use(remarkFrontmatter)
    .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
    .use(remarkToc)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathJax)
    .use(rehypeSlug)
    .use(rehypeStringify).process(file)

  // console.log(String(file))

  console.error(reporter(file))
  // file.extname = '.html'
  // await write(file)

  const data: VFileData = file.data;

  return {
    topicSeg: topicSeg,
    articleSeg: articleSeg,
    title: data.title as string,
    date: data.date as string,
    author: data.author as string,
    preview: data.preview as string,
    value: file.value,
  };
}

/**
 * Returns list of objects containing topicSeg and articleSeg attrinbutes.
 * The list is returned by generateStaicParams next.js function to generate
 * an article page for each article under each topic.
 */
export async function getArticleSegs(): Promise<{ topicSeg: string, articleSeg: string }[]> {

  const topicSegs = (await getSite()).topicSegs;
  const articleSegs = [];

  for (const { topicSeg } of topicSegs) {
    const topic = await getTopic(topicSeg);
    for (const { articleSeg } of topic.articleSegs) {
      articleSegs.push({
        topicSeg: topicSeg,
        articleSeg: articleSeg,
      });
    }
  }

  return articleSegs;
}