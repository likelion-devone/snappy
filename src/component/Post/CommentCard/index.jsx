import { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import SmallProfile from "component/common/SmallProfile/index";
import { AlertModal, DropdownModal } from "component/common/Modal";
import useModal from "hook/useModal";
import useAPI from "hook/useAPI";
import useAuthInfo from "hook/useAuthInfo";
import useDropdownModal from "hook/useDropdownModal";

import { req } from "lib/api/index";

import Icons from "asset/icon/icons";
import { FONT_SIZE } from "constant/style";
import { PROFILE_SIZE } from "constant/size";
import getTimeGapInKr from "util/getTimeGapInKr";

const CommentContentWrapper = styled.li`
  margin: 20px 0 12px;
`;

const StyledSmallProfile = styled(SmallProfile)`
  margin-bottom: 4px;
`;

const CreatedTime = styled.time`
  margin-left: 6px;
  font-weight: 400;
  font-size: ${FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.snGreyOff};
`;

const Comment = styled.p`
  margin-left: 52px;
  line-height: 18px;
  font-weight: 400;
  font-size: ${FONT_SIZE.BASE};
  color: ${({ theme }) => theme.snBlack};
  word-break: break-all;
`;

export default function CommentCard({
  author: { _id: authorId, image, accountname, username },
  content,
  createdAt,
  postId,
  commentId,
  onCommentChanges,
}) {
  const { _id: myId } = useAuthInfo();
  const isThisPostMine = authorId === myId;

  // 댓글 삭제 API
  const [
    isDeletingComment,
    deleteCommentResponse,
    deleteCommentError,
    deleteComment,
  ] = useAPI(req.comment.remove);
  const deleteCommentIfNotDeleting = () => {
    if (isDeletingComment) {
      alert("댓글을 삭제중입니다. 잠시 기다려주세요.");
      return;
    }
    deleteComment({ postId, commentId });
  };

  // 댓글 신고 API
  const [
    isReportingComment,
    reportCommentResponse,
    reportCommentError,
    reportComment,
  ] = useAPI(req.comment.report);
  const reportCommentIfNotReporting = () => {
    if (isReportingComment) {
      alert("댓글을 신고중입니다. 잠시 기다려주세요.");
      return;
    }
    reportComment({ postId, commentId });
  };

  const [
    isCommentMoreDropdownOpened,
    commentMoreDropdownOpen,
    commentMoreDropdownClose,
  ] = useDropdownModal();

  const [
    isReportCommentAlertModalOpened,
    reportCommentAlertModalOpen,
    reportCommentAlertModalClose,
    reportCommentAlertModalConfirm,
  ] = useModal(reportCommentIfNotReporting);
  const [
    isDeleteCommentAlertModalOpened,
    deleteCommentAlertModalOpen,
    deleteCommentAlertModalClose,
    deleteCommentAlertModalConfirm,
  ] = useModal(deleteCommentIfNotDeleting);

  useEffect(() => {
    if (reportCommentResponse) {
      alert("댓글을 신고했습니다.");
    }
    if (reportCommentError) {
      alert("댓글 신고중 오류가 발생했습니다.");
    }
  }, [reportCommentResponse, reportCommentError]);

  useEffect(() => {
    if (deleteCommentResponse) {
      alert("댓글을 삭제했습니다.");
      onCommentChanges();
    }
  }, [deleteCommentResponse, onCommentChanges]);

  useEffect(() => {
    if (deleteCommentError) {
      alert("댓글 삭제중 오류가 발생했습니다.");
    }
  }, [deleteCommentError]);

  return (
    <CommentContentWrapper>
      <StyledSmallProfile
        size={PROFILE_SIZE.SMALL}
        src={image}
        imageTo={`/profile/${accountname}`}
      >
        <SmallProfile.Side
          left={
            <SmallProfile.Side.Title
              title={username}
              titleTo={`/profile/${accountname}`}
              attachment={
                <CreatedTime dateTime={createdAt}>
                  {getTimeGapInKr(createdAt)}
                </CreatedTime>
              }
            />
          }
          right={
            <button type="button" onClick={commentMoreDropdownOpen}>
              <Icons.SMoreVertical />
            </button>
          }
        />
      </StyledSmallProfile>

      <DropdownModal
        isDroppedUp={isCommentMoreDropdownOpened}
        dropDown={commentMoreDropdownClose}
      >
        {!isThisPostMine ? (
          <DropdownModal.Button onClick={reportCommentAlertModalOpen}>
            신고하기
          </DropdownModal.Button>
        ) : (
          <DropdownModal.Button onClick={deleteCommentAlertModalOpen}>
            삭제하기
          </DropdownModal.Button>
        )}
      </DropdownModal>

      <AlertModal isModalOpened={isReportCommentAlertModalOpened}>
        <AlertModal.Content>댓글을 신고하시겠어요?</AlertModal.Content>
        <AlertModal.Cancle handleModalButton={reportCommentAlertModalClose}>
          취소
        </AlertModal.Cancle>
        <AlertModal.ConfirmButton
          handleModalButton={reportCommentAlertModalConfirm}
        >
          신고
        </AlertModal.ConfirmButton>
      </AlertModal>
      <AlertModal isModalOpened={isDeleteCommentAlertModalOpened}>
        <AlertModal.Content>댓글을 삭제하시겠어요?</AlertModal.Content>
        <AlertModal.Cancle handleModalButton={deleteCommentAlertModalClose}>
          취소
        </AlertModal.Cancle>
        <AlertModal.ConfirmButton
          handleModalButton={deleteCommentAlertModalConfirm}
        >
          삭제
        </AlertModal.ConfirmButton>
      </AlertModal>

      <Comment>{content}</Comment>
    </CommentContentWrapper>
  );
}

CommentCard.propTypes = {
  author: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  onCommentChanges: PropTypes.func.isRequired,
};
