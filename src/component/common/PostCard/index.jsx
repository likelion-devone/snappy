import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useContext } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";

import { AlertModal, DropdownModal } from "component/common/Modal";
import { PostDataContext } from "component/common/PostDataProvider/index";
import Carousel from "component/common/Carousel/index";
import SmallProfile from "../SmallProfile";

import useDropdownModal from "hook/useDropdownModal";
import useAuthInfo from "hook/useAuthInfo";
import useModal from "hook/useModal";
import useAPI from "hook/useAPI";

import { req } from "lib/api/index";
import routeResolver from "util/routeResolver";
import getTimeGapInKr from "util/getTimeGapInKr";

import { FONT_SIZE } from "constant/style";
import { PROFILE_SIZE } from "constant/size";
import ROUTE, { ROUTE_POST } from "constant/route";
import Icons from "asset/icon/icons";
import HeartButton from "./HeartButton/index";

const PostCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 24px 0;
`;

const ContentWrapper = styled.div`
  margin-left: 54px;
`;

const ContentText = styled.p`
  font-weight: 400;
  font-size: ${FONT_SIZE.BASE};
  line-height: 18px;
  word-break: break-all;
  white-space: pre-wrap;
  padding: 16px 0;
  a {
    display: block;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  margin: 15px 0 18px;
  font-weight: 400;
  font-size: 12px;
  background-color: ${({ theme }) => theme.snGrayIcon};
`;

const LinkIcon = styled(Link)`
  display: flex;
  align-items: center;
`;

const SvgComment = styled(Icons.MessageCircle)`
  margin: 0 6px 0 19px;
  width: 15px;
  height: 15px;
`;

const PostDate = styled.time`
  color: ${({ theme }) => theme.snGrayIcon};
  font-size: ${FONT_SIZE.SMALL};
  font-weight: 400;
  line-height: 12px;
`;

export default function PostCard({
  authorId,
  username,
  accountname,
  profileImage,
  postId,
  content,
  image,
  createdAt,
  updatedAt,
  hearted,
  heartCount,
  commentCount,
  $isPostDetailPage = false,
}) {
  const { getMyPostData, getPostData } = useContext(PostDataContext);
  const navigate = useNavigate();
  const isPostDetailPage = useMatch(routeResolver(ROUTE.POST, ":postId"));

  const { _id: myId } = useAuthInfo();
  const isThisPostMine = authorId === myId;

  // 게시글 삭제 API
  const [isDeletingPost, deletePostResponse, deletePosterror, deletePost] =
    useAPI(req.post.remove);
  const deletePostIfNotDeleting = () => {
    if (isDeletingPost) {
      alert("게시글을 삭제중입니다. 잠시 기다려주세요.");
      return;
    }
    deletePost({ postId });
  };

  // 게시글 신고 API
  const [isReportingPost, reportPostResponse, reportPosterror, reportPost] =
    useAPI(req.post.report);
  const reportPostIfNotReporting = () => {
    if (isReportingPost) {
      alert("게시글을 신고중입니다. 잠시 기다려주세요.");
      return;
    }
    reportPost({ postId });
  };

  useEffect(() => {
    if (reportPostResponse) {
      alert("게시물을 신고했습니다.");
    }
    if (reportPosterror) {
      alert("게시물 신고중 에러가 발생했습니다.");
      console.error(reportPosterror);
    }
  }, [reportPostResponse, reportPosterror]);

  useEffect(() => {
    if (deletePostResponse) {
      alert("게시물을 삭제했습니다.");
      if ($isPostDetailPage) {
        navigate(ROUTE.HOME);
        return;
      }

      getMyPostData();
      getPostData();
    }
    if (deletePosterror) {
      alert("게시물 삭제중 에러가 발생했습니다.");
      console.error(deletePosterror);
    }
  }, [
    deletePostResponse,
    deletePosterror,
    getMyPostData,
    getPostData,
    navigate,
    $isPostDetailPage,
  ]);

  // 삭제 메시지 모달창
  const [
    isDeleteMsgModalOpened,
    deleteMsgModalopen,
    deleteMsgModalclose,
    deleteMsgModalconfirm,
  ] = useModal(deletePostIfNotDeleting);

  // 신고 메시지 모달창
  const [
    isReportMsgModalOpened,
    reportMsgModalopen,
    reportMsgModalclose,
    reportMsgModalconfirm,
  ] = useModal(reportPostIfNotReporting);

  // 수정 & 삭제 드롭다운 모달
  const [isDroppedUp, dropUp, dropDown] = useDropdownModal();

  function handleEditDropdownButton() {
    navigate(routeResolver(ROUTE.POST, postId, ROUTE_POST.EDIT));
  }

  function handleDeleteDropdownButton() {
    deleteMsgModalopen();
  }

  // 신고하기 드롭다운 모달
  const [isReportDroppedUp, reportDropUp, reportDropDown] = useDropdownModal();

  function handleReportDropDownButton() {
    reportMsgModalopen();
  }

  return (
    <PostCardWrapper>
      <h2 className="sr-only">게시물</h2>
      <SmallProfile
        size={PROFILE_SIZE.SMALL}
        src={profileImage}
        imageTo={routeResolver(ROUTE.PROFILE, accountname)}
      >
        <SmallProfile.Side
          left={
            <SmallProfile.Side.Title
              title={username}
              subtitle={"@ " + accountname}
              titleTo={routeResolver(ROUTE.PROFILE, accountname)}
            />
          }
          right={
            <button
              type="button"
              onClick={isThisPostMine ? dropUp : reportDropUp}
            >
              <Icons.SMoreVertical />
            </button>
          }
        />
      </SmallProfile>

      {isThisPostMine ? (
        <DropdownModal isDroppedUp={isDroppedUp} dropDown={dropDown}>
          <DropdownModal.Button onClick={handleEditDropdownButton}>
            수정하기
          </DropdownModal.Button>
          <DropdownModal.Button onClick={handleDeleteDropdownButton}>
            삭제하기
          </DropdownModal.Button>
        </DropdownModal>
      ) : (
        <DropdownModal
          isDroppedUp={isReportDroppedUp}
          dropDown={reportDropDown}
        >
          <DropdownModal.Button onClick={handleReportDropDownButton}>
            신고하기
          </DropdownModal.Button>
        </DropdownModal>
      )}

      <AlertModal isModalOpened={isReportMsgModalOpened}>
        <AlertModal.Content>게시글을 신고하시겠어요?</AlertModal.Content>
        <AlertModal.Cancle handleModalButton={reportMsgModalclose}>
          취소
        </AlertModal.Cancle>
        <AlertModal.ConfirmButton handleModalButton={reportMsgModalconfirm}>
          신고
        </AlertModal.ConfirmButton>
      </AlertModal>

      <AlertModal isModalOpened={isDeleteMsgModalOpened}>
        <AlertModal.Content>게시글을 삭제하시겠어요?</AlertModal.Content>
        <AlertModal.Cancle handleModalButton={deleteMsgModalclose}>
          취소
        </AlertModal.Cancle>
        <AlertModal.ConfirmButton handleModalButton={deleteMsgModalconfirm}>
          삭제
        </AlertModal.ConfirmButton>
      </AlertModal>

      <ContentWrapper>
        {content && (
          isPostDetailPage ?
            (
              <ContentText>
                {content}
              </ContentText>
            ) : (
              <ContentText>
                <Link to={`/post/${postId}`}>{content}</Link>
              </ContentText>
            )
        )}

        {image && <Carousel imageLinks={image.split(",")} />}

        <IconWrapper>
          <HeartButton
            postId={postId}
            initialHearted={hearted}
            initialHeartCount={heartCount}
          />

          <LinkIcon to={`/post/${postId}`}>
            <SvgComment title="댓글 아이콘 입니다" />
            {commentCount}
          </LinkIcon>
        </IconWrapper>

        <PostDate dateTime={createdAt}>
          {getTimeGapInKr(createdAt)}
          {createdAt !== updatedAt && ` (${getTimeGapInKr(updatedAt)} 수정됨)`}
        </PostDate>
      </ContentWrapper>
    </PostCardWrapper>
  );
}

PostCard.propTypes = {
  authorId: PropTypes.string,
  username: PropTypes.string,
  accountname: PropTypes.string,
  profileImage: PropTypes.string,
  postId: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  hearted: PropTypes.bool,
  heartCount: PropTypes.number,
  commentCount: PropTypes.number,
  $isPostDetailPage: PropTypes.bool,
};
