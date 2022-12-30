import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import SmallProfile from "../SmallProfile";
import { AlertModal, DropdownModal } from "component/common/Modal";
import { PostDataContext } from "component/common/PostDataProvider/index";

import useDropdownModal from "hook/useDropdownModal";
import useModal from "hook/useModal";
import useAPI from "hook/useAPI";

import { req } from "lib/api/index";
import routeResolver from "util/routeResolver";
import getTimeGapInKr from "util/getTimeGapInKr";
import useAuthInfo from "hook/useAuthInfo";

import Icons from "asset/icon/icons";
import ErrorImg from "asset/logo-404-343264.png";

import { FONT_SIZE } from "constant/style";
import { PROFILE_SIZE } from "constant/size";
import ROUTE from "constant/route";

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
  margin: 16px 0;
  width: fit-content;
  word-break: break-all;
`;

const ContentPostImgWrapper = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
`;

const ContentPostImg = styled.img`
  max-width: 95%;
  height: 228px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  transition: all 0.2s;
  display: ${(props) => (props.isActive ? "flex" : "none")};
`;

const ButtonDotWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

const ButtonDot = styled.button`
  height: 11px;
  width: 11px;
  margin: 0 6px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isActive ? props.theme.snBlue : props.theme.snGreyOff};

  :hover {
    background-color: ${({ theme }) => theme.snBlue};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  margin: 15px 0 18px;
  font-weight: 400;
  font-size: 12px;
  background-color: ${({ theme }) => theme.snGrayIcon};
`;

const ButtonIcon = styled.button`
  display: flex;
  align-items: center;
`;

const LinkIcon = styled(Link)`
  display: flex;
  align-items: center;
`;

const SvgHeart = styled(Icons.Heart)`
  margin-right: 6px;
  width: 17px;
  height: 15px;
  path {
    ${({ $isHearted, theme }) => $isHearted && "fill:" + theme.snRed + ";"}
    stroke: ${({ $isHearted, theme }) =>
    $isHearted ? theme.snRed : theme.snGreyIcon};
  }
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
  hearted,
  heartCount,
  commentCount,
  $isPostDetailPage = false
}) {
  const { getMyPostData, getPostData } = useContext(PostDataContext);
  const navigate = useNavigate();

  const { _id: myId } = useAuthInfo();
  const isThisPostMine = authorId === myId;

  // 게시글 삭제 API
  const [isDeletingPost, deletePostResponse, deletePosterror, deletePost] = useAPI(
    req.post.remove
  );

  // 게시글 신고 API
  const [isReportingPost, reportPostResponse, reportPosterror, reportPost] = useAPI(
    req.post.report
  );

  // 슬라이드 버튼
  const [BtnDotCounter, setBtnDotCounter] = useState(0);

  // 좋아요 버튼
  const [isHearted, setIsHearted] = useState(hearted);
  const [heartCountState, setHeartCountState] = useState(heartCount);

  // 좋아요
  const [isLikeBeingActivated, _activateLikeResponse, _error, activateLike] =
    useAPI(req.like.activate);

  // 좋아요 취소
  const [isUnLikeBeingActivated, _cancelLikeResponse, __error, cancelLike] =
    useAPI(req.like.cancle);

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
  }, [deletePostResponse, deletePosterror, getMyPostData, getPostData, navigate, $isPostDetailPage]);

  const like = async () => {
    const {
      post: { hearted: newHearted, heartCount: newHeartCount },
    } = await activateLike({ postId });

    setIsHearted(newHearted);
    setHeartCountState(newHeartCount);
  };

  const unlike = async () => {
    const {
      post: { hearted: newHearted, heartCount: newHeartCount },
    } = await cancelLike({ postId });

    setIsHearted(newHearted);
    setHeartCountState(newHeartCount);
  };

  // 좋아요 버튼 active 여부에 따른 예외 처리
  const handleHeartClick = () => {
    // 로딩 중일 때 실행
    if (isLikeBeingActivated || isUnLikeBeingActivated) {
      return;
    }
    // 로딩 중이 아닐 때 실행
    if (isHearted) {
      unlike();
      return;
    }
    like();
  };

  const handleHeartButton = (event) => {
    event.preventDefault();
    setIsHearted((prev) => !prev);
  };

  const handleDeleteModalButton = () => {
    if (isDeletingPost) {
      return;
    }
    deletePost({ postId });
  }

  // 삭제 메시지 모달창
  const [
    isDeleteMsgModalOpened,
    deleteMsgModalopen,
    deleteMsgModalclose,
    deleteMsgModalconfirm,
  ] = useModal(handleDeleteModalButton);

  const handleReportModalButton = () => {
    if (isReportingPost) {
      return;
    }
    reportPost({ postId });
  }

  // 신고 메시지 모달창
  const [
    isReportMsgModalOpened,
    reportMsgModalopen,
    reportMsgModalclose,
    reportMsgModalconfirm,
  ] = useModal(handleReportModalButton);

  // 수정 & 삭제 드롭다운 모달
  const [isDroppedUp, dropUp, dropDown] =
    useDropdownModal();

  function handleDropDownButton() {
    deleteMsgModalopen();
    dropDown();
  }

  // 신고하기 드롭다운 모달
  const [isReportDroppedUp, reportDropUp, reportDropDown] = useDropdownModal();

  function handleReportDropDownButton() {
    reportDropDown();
    reportMsgModalopen();
  }

  // 이미지 여러장
  const multipleImgs = image && image.split(",").length > 1;

  const handleImgError = (event) => {
    event.target.src = ErrorImg;
  };

  return (
    <PostCardWrapper>
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
            <button type="button" onClick={isThisPostMine ? dropUp : reportDropUp}>
              <Icons.SMoreVertical />
            </button>
          }
        />
      </SmallProfile>

      {isThisPostMine ?
        <DropdownModal isDroppedUp={isDroppedUp} dropDown={dropDown}>
          <DropdownModal.Button onClick={handleDropDownButton}>
            수정하기
          </DropdownModal.Button>
          <DropdownModal.Button onClick={handleDropDownButton}>
            삭제하기
          </DropdownModal.Button>
        </DropdownModal>
        : <DropdownModal isDroppedUp={isReportDroppedUp} dropDown={reportDropDown}>
          <DropdownModal.Button onClick={handleReportDropDownButton}>
            신고하기
          </DropdownModal.Button>
        </DropdownModal>
      }
      <AlertModal isModalOpened={isReportMsgModalOpened}>
        <AlertModal.Content>게시글을 신고하시겠어요?</AlertModal.Content>
        <AlertModal.Cancle handleModalButton={reportMsgModalclose}>
          취소
        </AlertModal.Cancle>
        <AlertModal.ConfirmButton handleModalButton={reportMsgModalconfirm}>
          신고
        </AlertModal.ConfirmButton>
      </AlertModal>

      {/* TODO 게시글 수정시 수정 페이지로 이동 */}

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
        <ContentText>
          <Link to={`/post/${postId}`}>{content}</Link>
        </ContentText>
        <ContentPostImgWrapper>
          <Link to={`/post/${postId}`}>
            {image &&
              React.Children.toArray(
                image
                  .split(",")
                  .map((postImg, index) => (
                    <ContentPostImg
                      src={postImg}
                      isActive={index === BtnDotCounter}
                      onError={handleImgError}
                      onClick={(event) => event.preventDefault()}
                    />
                  ))
              )}
          </Link>

          {multipleImgs && (
            <ButtonDotWrapper>
              {React.Children.toArray(
                image
                  .split(",")
                  .map((postImg, index) => (
                    <ButtonDot
                      src={postImg}
                      isActive={index === BtnDotCounter}
                      onClick={() => setBtnDotCounter(index)}
                    />
                  ))
              )}
            </ButtonDotWrapper>
          )}
        </ContentPostImgWrapper>

        <IconWrapper>
          <ButtonIcon onClick={handleHeartButton}>
            <SvgHeart
              title="하트 아이콘 입니다"
              $isHearted={isHearted}
              onClick={handleHeartClick}
            />
            {heartCountState}
          </ButtonIcon>

          <LinkIcon to={`/post/${postId}`}>
            <SvgComment title="댓글 아이콘 입니다" />
            {commentCount}
          </LinkIcon>
        </IconWrapper>

        <PostDate dateTime={createdAt}>{getTimeGapInKr(createdAt)}</PostDate>
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
  hearted: PropTypes.bool,
  heartCount: PropTypes.number,
  commentCount: PropTypes.number,
  $isPostDetailPage: PropTypes.bool
};
