import PageTitle from "@app/ui/page-title";
import SiteAbout from "@app/ui/site-about";
import TopicPreviews from "@app/ui/topic-previews";
import { getSite, getTopics } from "@app/lib/data";

export default async function Page() {

  const site = await getSite();
  const topics = await getTopics();

  return (
    <main>
      <PageTitle titleMarkdown={site.name} />
      <SiteAbout aboutMarkdown={site.about}/>
      <TopicPreviews topics={topics} />
    </main>
  );
}