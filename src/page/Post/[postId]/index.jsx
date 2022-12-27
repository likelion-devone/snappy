import { useParams } from "react-router-dom";

import PostCard from "component/common/PostCard/index";
import useFetch from "hook/useFetch";
import { req } from "lib/api";

export default function PostDetail() {
  const { postId } = useParams();

  const [isPostDetailLoading, postDetail, _postDetailError] = useFetch(
    req.post.detail,
    {
      postId,
    }
  );

  // 로딩중이면 데이터가 들어오지 않습니다.
  if (isPostDetailLoading || !postDetail) {
    return <>로딩중</>;
  }
  return (
    <>
      <PostCard
        author={postDetail.post.author}
        postId={postDetail.post.id}
        content={postDetail.post.content}
        image={postDetail.post.image}
        createdAt={postDetail.post.createdAt}
        hearted={postDetail.post.hearted}
        heartCount={postDetail.post.heartCount}
        commentCount={postDetail.post.commentCount}
      />
    </>
  );
}
