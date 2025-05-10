import { SiteInfo, TopicInfo, ArticleInfo } from "@app/lib/types";
import { siteInfo, topicList, articleMap } from "@app/lib/store";

export function getSite(): SiteInfo {
  return siteInfo;
}

export function getTopics(): TopicInfo[] {
  return topicList;
}

export function getTopic(topicId: string): TopicInfo {
  let topicFound: TopicInfo;
  for (const topic of topicList) {
    if (topic.topicId === topicId) {
      topicFound = topic;
      break;
    }
  }
  return topicFound;
}

export function getArticle(topicId: string, articleId: string): ArticleInfo {
  return articleMap[topicId + articleId];
}
