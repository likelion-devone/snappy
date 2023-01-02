import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PostCard from "component/common/PostCard/index";
import CommentWrapper from "component/Post/CommentWrapper/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import useAPI from "hook/useAPI";
import useTopNavSetter from "hook/useTopNavSetter";

import { req } from "lib/api";

import routeResolver from "util/routeResolver";

import ROUTE from "constant/route";
import { PROFILE_SIZE } from "constant/size";
import { LoaderNappy } from "component/common/Animation/index";

const CommentCardWrapper = styled.ol`
  border-top: 1px solid ${({ theme }) => theme.snGreyOff};
  margin-bottom: 80px;
`;

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


  if (!postDetailInitialData) {
    return <LoaderNappy />;
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
