import styled from "styled-components";
import PropTypes from "prop-types";

import SmallProfile from "component/common/SmallProfile/index";
import AlertModal from "component/common/AlertModal";
import DropdownModal from "component/common/DropdownModal/index";
import useModal from "hook/useModal";
import useAPI from "hook/useAPI";
import useAuthInfo from "hook/useAuthInfo";
import useDropdownModal from "hook/useDropdownModal";

import { req } from "lib/api/index";

import Icons from "asset/icon/icons";
import { FONT_SIZE } from "constant/style";
import { PROFILE_SIZE } from "constant/size";
import { useEffect } from "react";
import getTimeGapInKr from "util/getTimeGapInKr";

const CommentContentWrapper = styled.li`
  margin: 20px 0 12px;
`;

const StyledSmallProfile = styled(SmallProfile)`
  margin-bottom: 4px;
`

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
}) {
  const { _id: myId } = useAuthInfo();
  const isThisPostMine = authorId === myId;

  // 댓글 삭제 API
  const [isDeletingComment, _deleteCommentResponse, _error, deleteComment] =
    useAPI(req.comment.remove);

  // 댓글 신고 API
  const [isReportingComment, reportCommentResponse, __error, reportComment] =
    useAPI(req.comment.report);

  // 삭제 메시지 모달창
  const [
    isDeleteMsgModalOpened,
    deleteMsgModalopen,
    deleteMsgModalclose,
    deleteMsgModalconfirm,
  ] = useModal(handleDeleteModalButton);

  function handleDeleteModalButton() {
    if (isDeletingComment) {
      return;
    }
    deleteComment({ postId, commentId });
  }

  // 신고 메시지 모달창
  const [
    isReportMsgModalOpened,
    reportMsgModalopen,
    reportMsgModalclose,
    reportMsgModalconfirm,
  ] = useModal(handleReportModalButton);

  function handleReportModalButton() {
    if (isReportingComment) {
      return;
    }
    reportComment({ postId, commentId });
  }

  useEffect(() => {
    if (reportCommentResponse) {
      alert('댓글 신고가 접수되었습니다.');
    }
  }, [reportCommentResponse])

  // 삭제 드롭다운 모달
  const [isDroppedUp, dropUp, dropDown] = useDropdownModal(
    handleDeleteDropDownButton
  );

  function handleDeleteDropDownButton() {
    deleteMsgModalopen();
    dropDown();
  }

  // 신고하기 드롭다운 모달
  const [_isReportDroppedUp, _reportDropUp, reportDropDown] = useDropdownModal(
    handleReportDropDownButton
  );

  function handleReportDropDownButton() {
    reportMsgModalopen();
    reportDropDown();
  }

  // TODO 댓글 작성 API

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
                <CreatedTime dateTime={createdAt}>{getTimeGapInKr(createdAt)}</CreatedTime>
              }
            />
          }
          right={
            <button type="button" onClick={dropUp}>
              <Icons.SMoreVertical />
            </button>
          }
        />
      </StyledSmallProfile>

      <DropdownModal isDroppedUp={isDroppedUp} dropDown={dropDown}>
        {!isThisPostMine ? (
          <DropdownModal.Button onClick={handleReportDropDownButton}>
            신고하기
          </DropdownModal.Button>
        ) : (
          <DropdownModal.Button onClick={handleDeleteDropDownButton}>
            삭제하기
          </DropdownModal.Button>
        )}
      </DropdownModal>

      {isReportMsgModalOpened && (
        <AlertModal isModalOpened={isReportMsgModalOpened}>
          <AlertModal.Content>댓글을 신고하시겠어요?</AlertModal.Content>
          <AlertModal.CancleButton handleModalButton={reportMsgModalclose}>
            취소
          </AlertModal.CancleButton>
          <AlertModal.ConfirmButton handleModalButton={reportMsgModalconfirm}>
            신고
          </AlertModal.ConfirmButton>
        </AlertModal>
      )}

      {isDeleteMsgModalOpened && (
        <>
          <AlertModal isModalOpened={isDeleteMsgModalOpened}>
            <AlertModal.Content>댓글을 삭제하시겠어요?</AlertModal.Content>
            <AlertModal.CancleButton handleModalButton={deleteMsgModalclose}>
              취소
            </AlertModal.CancleButton>
            <AlertModal.ConfirmButton
              handleModalButton={deleteMsgModalconfirm}
            >
              삭제
            </AlertModal.ConfirmButton>
          </AlertModal>
        </>
      )}

      <Comment>{content}</Comment>
    </CommentContentWrapper>
  );
}

CommentCard.propTypes = {
  author: PropTypes.object,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  commentId: PropTypes.string,
  postId: PropTypes.string,
};
