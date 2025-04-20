export default function TopicPreview({
  title, text, articles
}: {
  title: string, text: string, articles: number
}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      <p>{articles} articles</p>
    </div>
  );
}