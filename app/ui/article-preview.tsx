export default function ArticlePreview({
  title, text, date
}: {
  title: string, text: string, date: string
}) {
  return (
    <div>
      <p>{date}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}