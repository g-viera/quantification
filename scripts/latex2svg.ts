import * as process from "process";
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

/* 
Takes a latex string and uses mathjax to convert it
into an svg element that is then converted into a
an html fragment string. 
*/

const math =
  "1,2,3dots \text{ let } S \neq emptyset, \text{ if } exists u in mathbb{R} : x leq u \text{ } \forall x in S, \text{ then } sup S";

const args = process.argv.slice(2);
const name = args[0] || "World";

console.log(`Hello, ${name}!`);
