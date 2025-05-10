import ArticleHeader from "@app/ui/article-header";
import styles from "./article.module.css";

export default async function Article({ topic, article }) {
  return (
    <article className={styles.articles}>
      <ArticleHeader topic={topic} article={article} />
      <div dangerouslySetInnerHTML={{ __html: article.articleHtml }}></div>
    </article>
  );
}
