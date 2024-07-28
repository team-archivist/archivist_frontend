import HomeFeedView from "@arcave/components/views/HomeFeedView";
import useHomeFeed from "@arcave/hooks/useHomeFeed";

interface HomeFeedPageProps {}

const FeedPage = (props: HomeFeedPageProps) => {
  const {
    topGroups,
    middleGroups,
    bottomGroups,
    topLinks,
    middleLinks,
    bottomLinks,
    allLinks,
  } = useHomeFeed();

  return (
    <HomeFeedView
      topGroups={topGroups}
      middleGroups={middleGroups}
      bottomGroups={bottomGroups}
      topLinks={topLinks}
      middleLinks={middleLinks}
      bottomLinks={bottomLinks}
      allLinks={allLinks}
    />
  );
};

export default FeedPage;
