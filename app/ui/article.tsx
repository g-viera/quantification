import PageTitle from './page-title';

export default async function Article({ article }) {

  return (
    <article>
      <PageTitle title={article.title} />
      <p>{article.date}</p>
      <p>{article.author}</p>
      <div dangerouslySetInnerHTML={{ __html: article.value }}></div>
    </article>
  );
}