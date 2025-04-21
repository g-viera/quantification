import ArticlePreview from "@app/ui/article-preview";

export default function ArticlePreviews({ articles }) {
  
  const articlePreviews = [];
  for (const article of articles) {
    const key = article.articleSeg;
    articlePreviews.push(
      <ArticlePreview key={key} article={article} />
    );
  }

  return (
    <div>{articlePreviews}</div>
  );
}