import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PostCard from "component/common/PostCard/index";
import useFetch from "hook/useFetch";
import { req } from "lib/api";

import CommentCard from "component/Post/Comment/CommentCard/index";

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // 게시물 상세
  const [isPostDetailLoading, postDetail, postDetailError] = useFetch(
    req.post.detail,
    {
      postId,
    }
  );

  // 댓글 리스트
  const [isCommentLoading, commentData, _commentError] = useFetch(
    req.comment.load,
    {
      postId,
    }
  );

  useEffect(() => {
    if (postDetailError) {
      navigate("404");
    }
  }, [postDetailError, navigate]);

  // 로딩중이면 데이터가 들어오지 않습니다.
  if (isPostDetailLoading || !postDetail || isCommentLoading || !commentData) {
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
      {commentData.comments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </>
  );
}
