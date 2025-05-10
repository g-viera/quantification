export default async function TopicIntro({ introHtml }) {
  return (
    <div className="mb-8" dangerouslySetInnerHTML={{ __html: introHtml }}></div>
  );
}
