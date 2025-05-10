import PageTitle from "@app/ui/page-title";
import SiteIntro from "@app/ui/site-intro";
import TopicPreviews from "@app/ui/topic-previews";
import { getSite, getTopics } from "@app/lib/api";

export default async function Page() {
  const site = getSite();
  const topics = getTopics();
  return (
    <main>
      <PageTitle title={site.title} />
      <SiteIntro introHtml={site.introHtml} />
      <TopicPreviews topics={topics} />
    </main>
  );
}
