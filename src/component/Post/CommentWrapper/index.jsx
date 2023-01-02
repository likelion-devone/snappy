import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";

import CommentCard from "component/Post/CommentCard/index";
import { CommentForm } from "component/common/Form";
import SmallProfile from "component/common/SmallProfile/index";

import useAPI from "hook/useAPI";
import useAuthInfo from "hook/useAuthInfo";

import { req } from "lib/api";

import routeResolver from "util/routeResolver";

import ROUTE from "constant/route";
import { PROFILE_SIZE } from "constant/size";

const CommentCardWrapper = styled.ol`
  border-top: 1px solid ${({ theme }) => theme.snGreyOff};
  margin-bottom: 80px;
`;

export default function CommentWrapper({ postId, onCommentChanges }) {
  const { image: authProfileImage } = useAuthInfo();
  const [prevCommentData, setPrevCommentData] = useState(null);

  // 댓글 리스트
  const [_isCommentLoading, commentData, _commentError, getComments] = useAPI(
    req.comment.load
  );

  useEffect(() => {
    getComments({ postId });
  }, [getComments, postId]);

  useEffect(() => {
    if (commentData) {
      setPrevCommentData(commentData);
    }
  }, [commentData]);

  // 댓글 작성
  const [
    isCommentCreating,
    createCommentResult,
    createCommentError,
    createComment,
  ] = useAPI(req.comment.create);

  useEffect(() => {
    if (createCommentResult) {
      getComments({ postId });
    }
    if (createCommentError) {
      alert("댓글 게시중 오류가 발생했습니다.");
    }
  }, [createCommentResult, createCommentError, getComments, postId]);

  const createCommentIfNotCreating = (event) => {
    event.preventDefault();

    if (isCommentCreating) {
      alert("댓글을 게시하고 있습니다.");
      return;
    }
    const {
      target: {
        inpComment: { value },
      },
    } = event;
    if (!value) {
      return;
    }

    createComment({
      postId,
      content: value,
    });

    onCommentChanges();
  };

  const handleCommentChanges = useCallback(() => {
    onCommentChanges();
    getComments({ postId });
  }, [onCommentChanges, postId, getComments]);

  // 로딩중이면 데이터가 들어오지 않습니다.
  if (!prevCommentData) {
    return <>로딩중</>;
  }

  return (
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
        {prevCommentData.comments
          .sort(
            (comment1, comment2) =>
              Date.parse(comment1.createdAt) - Date.parse(comment2.createdAt)
          )
          .map((comment) => (
            <CommentCard
              key={comment.id}
              {...{
                ...comment,
                commentId: comment.id,
                postId,
              }}
              onCommentChanges={handleCommentChanges}
            />
          ))}
      </CommentCardWrapper>
    </section>
  );
}

CommentWrapper.propTypes = {
  postId: PropTypes.string.isRequired,
  onCommentChanges: PropTypes.func,
};
