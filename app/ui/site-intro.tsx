export default async function SiteIntro({ introHtml }) {
  return (
    <div className="mb-8" dangerouslySetInnerHTML={{ __html: introHtml }}></div>
  );
}
