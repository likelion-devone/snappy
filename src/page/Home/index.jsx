import PostCard from "component/common/PostCard/index";
import useFetch from "hook/useFetch";
import { req } from "lib/api";
import useAuthInfo from "hook/useAuthInfo";

export default function HomePage() {
  const authInfo = useAuthInfo();

  const [isPostDataLoading, postData, _error] = useFetch(req.post.feed);

  // 내 게시글도 피드에 보이게 하기
  const [isMyPostDataLoading, myPostData, __error] = useFetch(
    req.post.userposts,
    { accountname: authInfo.accountname }
  );

  // 로딩중이면 데이터가 들어오지 않습니다.
  if (isPostDataLoading || !postData || isMyPostDataLoading || !myPostData) {
    return <>로딩중</>;
  }

  // 최신순으로 게시글을 확인합니다.
  return [...postData.posts, ...myPostData.post]
    .sort(
      (post1, post2) =>
        new Date(post2.createdAt).getTime() -
        new Date(post1.createdAt).getTime()
    )
    .map((postCard) => (
      <PostCard key={postCard.id} {...{ ...postCard, postId: postCard.id }} />
    ));
}
