import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import useAPI from "hook/useAPI";

import { req } from "lib/api/index";

import Icons from "asset/icon/icons";

const ButtonIcon = styled.button`
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

export default function HeartButton({ postId, initialHearted, initialHeartCount }) {
  // 좋아요 버튼
  const [isHearted, setIsHearted] = useState(initialHearted);
  const [heartCountState, setHeartCountState] = useState(initialHeartCount);

  // 좋아요
  const [isLikeBeingActivated, _activateLikeResponse, _error, activateLike] =
    useAPI(req.like.activate);

  // 좋아요 취소
  const [isUnLikeBeingActivated, _cancelLikeResponse, __error, cancelLike] =
    useAPI(req.like.cancle);

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

  const handleHeartButton = () => {
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
    <ButtonIcon onClick={handleHeartButton}>
      <SvgHeart
        title="하트 아이콘 입니다"
        $isHearted={isHearted}
      />
      {heartCountState}
    </ButtonIcon>
  )
}

HeartButton.propTypes = {
  postId: PropTypes.string.isRequired,
  initialHearted: PropTypes.bool.isRequired,
  initialHeartCount: PropTypes.number.isRequired,
}