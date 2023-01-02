import styled from "styled-components";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CommentCard from "component/Post/CommentCard/index";
import PostCard from "component/common/PostCard/index";
import { CommentForm } from "component/common/Form";
import SmallProfile from "component/common/SmallProfile/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import useFetch from "hook/useFetch";
import useAPI from "hook/useAPI";
import useAuthInfo from "hook/useAuthInfo";
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
    right: <></>
  })

  const { postId } = useParams();
  const navigate = useNavigate();
  const { image: authProfileImage } = useAuthInfo();

  // 게시물 상세
  const [isPostDetailLoading, postDetail, postDetailError] = useFetch(req.post.detail, { postId });

  // 댓글 리스트
  const [isCommentLoading, commentData, _commentError, getComments] = useAPI(req.comment.load);

  // 댓글 작성
  const [isCommentCreating, createCommentResult, createCommentError, createComment] = useAPI(req.comment.create);
  const createCommentIfNotCreating = (event) => {
    event.preventDefault();

    if (isCommentCreating) {
      alert("댓글을 게시하고 있습니다.");
      return;
    }
    const { target: { inpComment: { value } } } = event;
    if (!value) {
      return;
    }

    createComment({
      postId,
      content: value
    });
  }

  useEffect(() => {
    if (createCommentResult) {
      getComments({ postId });
    }
    if (createCommentError) {
      alert("댓글 게시중 오류가 발생했습니다.")
    }
  }, [createCommentResult, createCommentError, getComments, postId])

  useEffect(() => {
    getComments({ postId });
  }, [getComments, postId])

  useEffect(() => {
    if (postDetailError) {
      navigate("404");
    }
  }, [postDetailError, navigate]);

  // 로딩중이면 데이터가 들어오지 않습니다.
  if (isPostDetailLoading || !postDetail || isCommentLoading || !commentData) {
    return <LoaderNappy />;
  }

  return (
    <>
      <PostCard
        authorId={postDetail.post.author._id}
        username={postDetail.post.author.username}
        accountname={postDetail.post.author.accountname}
        profileImage={postDetail.post.author.image}
        postId={postDetail.post.id}
        content={postDetail.post.content}
        image={postDetail.post.image}
        createdAt={postDetail.post.createdAt}
        updatedAt={postDetail.post.updatedAt}
        hearted={postDetail.post.hearted}
        heartCount={postDetail.post.heartCount}
        commentCount={postDetail.post.commentCount}
        $isPostDetailPage={true}
      />
      <section>
        <h2 className="sr-only">댓글란</h2>
        <CommentForm
          left={
            <SmallProfile
              src={authProfileImage}
              imageTo={routeResolver(ROUTE.PROFILE)}
              size={PROFILE_SIZE.X_SMALL}
            />
          }
          right={<button type="submit">게시</button>}
          onSubmit={createCommentIfNotCreating}
          placeholder="댓글을 입력해주세요."
        />
        <CommentCardWrapper>
          {commentData.comments
            .sort((comment1, comment2) =>
              Date.parse(comment1.createdAt) - Date.parse(comment2.createdAt)
            ).map((comment) => (
              <CommentCard key={comment.id} {...{
                ...comment,
                commentId: comment.id,
                postId: postDetail.post.id
              }}
                getComments={getComments}
              />
            ))}
        </CommentCardWrapper>
      </section>
    </>
  );
}
