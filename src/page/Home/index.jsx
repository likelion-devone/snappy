import PostCard from "component/common/PostCard/index";
import useFetch from "hook/useFetch";
import { req } from "lib/api";

export default function HomePage() {
  const [isPostDataLoading, postData, _error] = useFetch(req.post.feed);

  if (isPostDataLoading || !postData) {
    return <>로딩중</>;
  }

  return postData.posts.map((postCard) => (
    <PostCard key={postCard.id} {...postCard} />
  ));
}
