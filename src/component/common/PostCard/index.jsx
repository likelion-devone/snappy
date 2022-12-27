import styled from "styled-components";
import PropTypes from "prop-types";

import Icons from "asset/icon/icons";
import SmallProfile from "../SmallProfile";
import AlertModal from "component/common/AlertModal";
import useModal from "hook/useModal";
import useAPI from "hook/useAPI";

import ErrorImg from "asset/logo-404-343264.png";
import { req } from "lib/api/index";
import { FONT_SIZE } from "constant/style";
import { PROFILE_SIZE } from "constant/size";

import React, { useState } from "react";
import { Link } from "react-router-dom";

// Post Card가 여러개일 경우, 나머지는 margin: 28px 이어야 합니다.
const PostCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 24px 0;
`;

const ContentWrapper = styled.div`
  margin-left: 54px;
`;

// 텍스트 아래에 이미지가 없는 경우 margin-bottom: 18.73px;
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
  width: auto;
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
  // 기존 슬라이드 버튼 사이즈는 6px입니다.
  height: 11px;
  width: 11px;
  margin: 0 6px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isActive ? props.theme.snBlue : props.theme.snGreyOff};

  &:hover {
    background-color: ${({ theme }) => theme.snBlue};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  margin: 15px 0 18px; // 아이콘과 숫자의 상하 간격이 서로 달라 임의로 수정했습니다.
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

export default function PostCard({ ...post }) {
  let {
    author: { username, accountname, image: profileImage },
    id,
    content,
    image,
    createdAt,
    hearted,
    heartCount,
    commentCount,
  } = post;

  // 슬라이드 버튼
  const [BtnDotCounter, setBtnDotCounter] = useState(0);

  // 좋아요 버튼
  const [isHearted, setIsHearted] = useState(hearted);
  const [heartCountState, setHeartCountState] = useState(heartCount);

  // 모달 열기
  const [isModalOpened, openModal, closeModal, confirmModal] = useModal(
    handleDeleteModalButton
  );

  const [isDeletingPost, _deletePostResponse, ___error, deletePost] = useAPI(
    req.post.remove
  );
  // TODO 게시글 삭제
  function handleDeleteModalButton() {
    if (isDeletingPost) {
      return;
    }

    deletePost({ postId: id });
  }
  // TODO 게시글 신고

  // 게시글 생성 날짜
  const [year, month, day] = formCreatedDate(createdAt);

  function formCreatedDate(datestring) {
    const postDate = new Date(Date.parse(datestring));
    const year = postDate.getFullYear();
    const month = postDate.getMonth() + 1;
    const day = postDate.getDate();
    return [year, month, day];
  }

  const multipleImgs = image && image.split(",").length > 1;

  const handleImgError = (event) => {
    event.target.src = ErrorImg;
  };

  const handleHeartButton = (event) => {
    event.preventDefault();
    setIsHearted((prev) => !prev);
  };

  // 좋아요
  const [isLikeBeingActivated, _activateLikeResponse, _error, activateLike] =
    useAPI(req.like.activate);

  // 좋아요 취소
  const [isUnLikeBeingActivated, _cancelLikeResponse, __error, cancelLike] =
    useAPI(req.like.cancle);

  const like = async () => {
    const {
      post: { hearted: newHearted, heartCount: newHeartCount },
    } = await activateLike({ postId: id });

    setIsHearted(newHearted);
    setHeartCountState(newHeartCount);
  };

  const unlike = async () => {
    const {
      post: { hearted: newHearted, heartCount: newHeartCount },
    } = await cancelLike({ postId: id });

    setIsHearted(newHearted);
    setHeartCountState(newHeartCount);
  };

  // active가 되어있는지, 안되어 있는지 예외 처리해주는 함수
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

  return (
    // Link 연결은 추후 로직 변경 시 수정 예정입니다.
    <PostCardWrapper>
      <Link to={`/profile/${accountname}`}>
        <SmallProfile size={PROFILE_SIZE.SMALL}>
          <SmallProfile.Side
            left={
              <SmallProfile.Side.Title
                title={username}
                subtitle={"@ " + accountname}
                // TODO src={profileImage}
              />
            }
            right={
              <button type="button" onClick={openModal}>
                <Icons.SMoreVertical />
              </button>
            }
          />
        </SmallProfile>
      </Link>
      {isModalOpened && (
        <>
          <button type="button" onClick={openModal}>
            모달 열기
            {/* TODO 모달 변경 */}
          </button>
          <AlertModal isModalOpened={isModalOpened}>
            <AlertModal.Content>게시글을 삭제할까요?</AlertModal.Content>
            <AlertModal.CancleButton handleModalButton={closeModal}>
              취소
            </AlertModal.CancleButton>
            <AlertModal.ConfirmButton handleModalButton={confirmModal}>
              삭제
            </AlertModal.ConfirmButton>
          </AlertModal>
        </>
      )}
      <ContentWrapper>
        <ContentText>
          <Link
            to={{
              pathname: `/post/${post.id}`,
              state: { post },
            }}
          >
            {content}
          </Link>
        </ContentText>
        <ContentPostImgWrapper>
          <Link
            to={{
              pathname: `/post/${post.id}`,
              state: { post },
            }}
          >
            {image &&
              React.Children.toArray(
                image
                  .split(",")
                  .map((postImg, index) => (
                    <ContentPostImg
                      src={postImg}
                      isActive={index === BtnDotCounter}
                      onError={handleImgError}
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
              title="하트 아이콘"
              $isHearted={isHearted}
              onClick={handleHeartClick}
            />
            {heartCountState}
          </ButtonIcon>

          <LinkIcon
            to={{
              pathname: `/post/${post.id}`,
              state: { post },
            }}
          >
            <SvgComment title="댓글 아이콘" />
            {commentCount}
          </LinkIcon>
        </IconWrapper>

        <PostDate>
          {year}년 {month}월 {day}일
        </PostDate>
      </ContentWrapper>
    </PostCardWrapper>
  );
}

PostCard.propTypes = {
  author: PropTypes.object,
  id: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  createdAt: PropTypes.string,
  hearted: PropTypes.bool,
  heartCount: PropTypes.number,
  commentCount: PropTypes.number,
};
