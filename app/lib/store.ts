import { read } from "to-vfile";
import { VFile, VFileValue } from "vfile";
import { SiteInfo, TopicInfo, ArticleInfo } from "@app/lib/types";
// import { reporter } from "vfile-reporter";
import path from "node:path";
import process from "node:process";
import yaml from "yaml";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import extractFrontmatter from "remark-extract-frontmatter";
// import remarkStringify from "remark-stringify";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeMathJax from "rehype-mathjax/svg";
import rehypeStringify from "rehype-stringify";
// import rehypeSlug from "rehype-slug";
import { unified } from "unified";

const content = path.join(process.env.QUANT, "content");

export async function getBannerHtml(): Promise<VFileValue> {
  const bannerPath = path.join(content, "banner.md");
  const file = await read(bannerPath);

  await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathJax)
    .use(rehypeStringify)
    .process(file);

  return file.value;
}

async function getSiteInfo(): Promise<SiteInfo> {
  const sitePath = path.join(content, "site.md");
  const file = await read(sitePath);

  await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(file);

  return {
    name: file.data.name as string,
    phrase: file.data.phrase as string,
    bannerHtml: await getBannerHtml(),
    title: file.data.title as string,
    introHtml: file.value,
    copyright: file.data.copyright as { owner: string; from: string },
    topicIds: file.data.topicIds as { topicId: string }[],
  };
}

async function getTopicList(site: SiteInfo): Promise<TopicInfo[]> {
  const topicList = [];
  for (const { topicId } of site.topicIds) {
    const topicPath = path.join(content, topicId, "topic.md");
    const topicFile = await read(topicPath);

    await unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(extractFrontmatter, { yaml: yaml.parse, remove: true })
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(topicFile);

    // Generate html for preview markdown.
    const previewFile = new VFile(topicFile.data.preview as Uint8Array);
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(previewFile);

    topicList.push({
      topicId: topicId,
      title: topicFile.data.title as string,
      previewHtml: previewFile.value,
      introHtml: topicFile.value,
      articleIds: topicFile.data.articleIds as { articleId: string }[],
    });
  }

  return topicList;
}

export async function getArticle(
  topicId: string,
  articleId: string
): Promise<ArticleInfo> {
  const articlePath = path.join(content, topicId, articleId, "article.md");
  const articleFile = await read(articlePath);

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
    .use(rehypeStringify)
    .process(articleFile);

  // Generate html for preview markdown.
  const previewFile = new VFile(articleFile.data.preview as Uint8Array);
  await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathJax)
    .use(rehypeStringify)
    .process(previewFile);

  // console.log(String(file))
  // console.error(reporter(file));
  // file.extname = '.html'
  // await write(file)

  return {
    topicId: topicId,
    articleId: articleId,
    title: articleFile.data.title as string,
    date: articleFile.data.date as string,
    author: articleFile.data.author as string,
    previewHtml: previewFile.value,
    articleHtml: articleFile.value,
  };
}

async function getArticleMap(topicList: TopicInfo[]) {
  const articleMap: object = {};
  for (const topic of topicList) {
    for (const { articleId } of topic.articleIds) {
      const article = await getArticle(topic.topicId, articleId);
      const key = topic.topicId + articleId;
      articleMap[key] = article;
    }
  }
  return articleMap;
}

export const siteInfo: SiteInfo = await getSiteInfo();
export const topicList: TopicInfo[] = await getTopicList(siteInfo);
export const articleMap: object = await getArticleMap(topicList);
