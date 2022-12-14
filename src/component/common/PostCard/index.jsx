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

  // ????????? ?????? API
  const [isDeletingPost, deletePostResponse, deletePosterror, deletePost] =
    useAPI(req.post.remove);
  const deletePostIfNotDeleting = () => {
    if (isDeletingPost) {
      alert("???????????? ??????????????????. ?????? ??????????????????.");
      return;
    }
    deletePost({ postId });
  };

  // ????????? ?????? API
  const [isReportingPost, reportPostResponse, reportPosterror, reportPost] =
    useAPI(req.post.report);
  const reportPostIfNotReporting = () => {
    if (isReportingPost) {
      alert("???????????? ??????????????????. ?????? ??????????????????.");
      return;
    }
    reportPost({ postId });
  };

  useEffect(() => {
    if (reportPostResponse) {
      alert("???????????? ??????????????????.");
    }
    if (reportPosterror) {
      alert("????????? ????????? ????????? ??????????????????.");
      console.error(reportPosterror);
    }
  }, [reportPostResponse, reportPosterror]);

  useEffect(() => {
    if (deletePostResponse) {
      alert("???????????? ??????????????????.");
      if ($isPostDetailPage) {
        navigate(ROUTE.HOME);
        return;
      }

      getMyPostData();
      getPostData();
    }
    if (deletePosterror) {
      alert("????????? ????????? ????????? ??????????????????.");
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

  // ?????? ????????? ?????????
  const [
    isDeleteMsgModalOpened,
    deleteMsgModalopen,
    deleteMsgModalclose,
    deleteMsgModalconfirm,
  ] = useModal(deletePostIfNotDeleting);

  // ?????? ????????? ?????????
  const [
    isReportMsgModalOpened,
    reportMsgModalopen,
    reportMsgModalclose,
    reportMsgModalconfirm,
  ] = useModal(reportPostIfNotReporting);

  // ?????? & ?????? ???????????? ??????
  const [isDroppedUp, dropUp, dropDown] = useDropdownModal();

  function handleEditDropdownButton() {
    navigate(routeResolver(ROUTE.POST, postId, ROUTE_POST.EDIT));
  }

  function handleDeleteDropdownButton() {
    deleteMsgModalopen();
  }

  // ???????????? ???????????? ??????
  const [isReportDroppedUp, reportDropUp, reportDropDown] = useDropdownModal();

  function handleReportDropDownButton() {
    reportMsgModalopen();
  }

  return (
    <PostCardWrapper>
      <h2 className="sr-only">?????????</h2>
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
            ????????????
          </DropdownModal.Button>
          <DropdownModal.Button onClick={handleDeleteDropdownButton}>
            ????????????
          </DropdownModal.Button>
        </DropdownModal>
      ) : (
        <DropdownModal
          isDroppedUp={isReportDroppedUp}
          dropDown={reportDropDown}
        >
          <DropdownModal.Button onClick={handleReportDropDownButton}>
            ????????????
          </DropdownModal.Button>
        </DropdownModal>
      )}

      <AlertModal isModalOpened={isReportMsgModalOpened}>
        <AlertModal.Content>???????????? ??????????????????????</AlertModal.Content>
        <AlertModal.Cancle handleModalButton={reportMsgModalclose}>
          ??????
        </AlertModal.Cancle>
        <AlertModal.ConfirmButton handleModalButton={reportMsgModalconfirm}>
          ??????
        </AlertModal.ConfirmButton>
      </AlertModal>

      <AlertModal isModalOpened={isDeleteMsgModalOpened}>
        <AlertModal.Content>???????????? ??????????????????????</AlertModal.Content>
        <AlertModal.Cancle handleModalButton={deleteMsgModalclose}>
          ??????
        </AlertModal.Cancle>
        <AlertModal.ConfirmButton handleModalButton={deleteMsgModalconfirm}>
          ??????
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
            <SvgComment title="?????? ????????? ?????????" />
            {commentCount}
          </LinkIcon>
        </IconWrapper>

        <PostDate dateTime={createdAt}>
          {getTimeGapInKr(createdAt)}
          {createdAt !== updatedAt && ` (${getTimeGapInKr(updatedAt)} ?????????)`}
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
