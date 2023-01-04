import { useCallback, useState } from "react";
import useAPI from "hook/useAPI";
import { req } from "lib/api/index";

export default function usePagination() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const [_isFeedLoading, _feedData, _feedError, loadFeed] = useAPI(
    req.post.feedPagination
  );

  const loadMoreFeeds = useCallback(
    async (skip) => {
      setLoading(true);
      // const controller = new AbortController();
      // const { signal } = controller;

      try {
        const { posts: feedArray } = await loadFeed({
          limit: 20,
          skip,
        });

        // controller.abort();

        setFeeds((prevFeeds) => {
          console.log([...prevFeeds, ...feedArray]);
          return [...prevFeeds, ...feedArray];
        });

        setHasMore(feedArray.length > 0);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    },
    [loadFeed]
  );

  return { loading, error, feeds, hasMore, loadMoreFeeds };
}
