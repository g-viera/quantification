import TopicPreview from "@app/ui/topic-preview";

export default function TopicPreviews({ topics }) {
  const topicPreviews = [];
  for (const topic of topics) {
    const key = topic.topicId;
    topicPreviews.push(<TopicPreview key={key} topic={topic} />);
  }

  return <div>{topicPreviews}</div>;
}
