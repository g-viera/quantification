import { VFileValue } from "vfile";

export interface Copyright {
  owner: string;
  from: string;
}

export interface SiteInfo {
  name: string;
  phrase: string;
  bannerHtml: VFileValue;
  title: string;
  introHtml: VFileValue;
  copyright: Copyright;
  topicIds: { topicId: string }[];
}

export interface TopicInfo {
  topicId: string;
  title: string;
  previewHtml: VFileValue;
  introHtml: VFileValue;
  articleIds: { articleId: string }[];
}

export interface ArticleInfo {
  topicId: string;
  articleId: string;
  title: string;
  date: string;
  author: string;
  previewHtml: VFileValue;
  articleHtml: VFileValue;
}
