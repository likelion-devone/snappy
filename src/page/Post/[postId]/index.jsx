import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PostCard from "component/common/PostCard/index";
import CommentWrapper from "component/Post/CommentWrapper/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import useAPI from "hook/useAPI";
import useTopNavSetter from "hook/useTopNavSetter";

import { req } from "lib/api";

export default function PostDetail() {
  useTopNavSetter({
    title: "포스트 상세 페이지",
    left: <TopNavElement.GoBackButton />,
    right: <></>,
  });

  const { postId } = useParams();
  const navigate = useNavigate();

  const [postDetailInitialData, setPostDetailInitialData] = useState(null);

  // 게시물 상세
  const [_isPostDetailLoading, postDetail, postDetailError, loadPostDetail] =
    useAPI(req.post.detail);

  useEffect(() => {
    loadPostDetail({ postId });
  }, [loadPostDetail, postId]);

  useEffect(() => {
    if (!postDetailInitialData && postDetail) {
      setPostDetailInitialData(postDetail);
    }
  }, [postDetailInitialData, postDetail]);

  useEffect(() => {
    if (postDetailError) {
      navigate("404");
    }
  }, [postDetailError, navigate]);

  const handleOnCommentChanges = useCallback(
    () => loadPostDetail({ postId }),
    [loadPostDetail, postId]
  );

  // 로딩중이면 데이터가 들어오지 않습니다.
  if (!postDetailInitialData) {
    return <>로딩중</>;
  }

  return (
    <>
      <PostCard
        authorId={postDetailInitialData.post.author._id}
        username={postDetailInitialData.post.author.username}
        accountname={postDetailInitialData.post.author.accountname}
        profileImage={postDetailInitialData.post.author.image}
        postId={postDetailInitialData.post.id}
        content={postDetailInitialData.post.content}
        image={postDetailInitialData.post.image}
        createdAt={postDetailInitialData.post.createdAt}
        updatedAt={postDetailInitialData.post.updatedAt}
        hearted={postDetailInitialData.post.hearted}
        heartCount={postDetailInitialData.post.heartCount}
        commentCount={
          postDetailInitialData.post.commentCount !==
          postDetail?.post.commentCount
            ? postDetail?.post.commentCount
            : postDetailInitialData.post.commentCount
        }
        $isPostDetailPage={true}
      />
      <CommentWrapper
        postId={postId}
        onCommentChanges={handleOnCommentChanges}
      />
    </>
  );
}
