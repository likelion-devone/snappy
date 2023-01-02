import React from "react";
import styled, { css, keyframes } from "styled-components";
import { FONT_SIZE, GLOBAL_NAVBAR_HEIGHT, TOP_NAVBAR_HEIGHT } from "constant/style";
import srcLogoBw from "asset/logo-bw-212262.png";
import Spinner from "component/common/Animation/Spinner"

//loading 단어 에니메이션
const keyframeLoading = keyframes`
  0% {
    scale: 1;
  }
  100% {
    scale: 0.5;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${GLOBAL_NAVBAR_HEIGHT} - ${TOP_NAVBAR_HEIGHT});
  width: 100%;
`;

const LogoWrapper = styled.div`
  position: relative;
`;

const LogoBw = styled.img`
  width: 212px;
  height: 262px;
  transform: translate(-20px);
  z-index: 1;
`;

//loading 카메라 랜즈 에니메이션
const StyledSpinner = styled(Spinner)`
  position: absolute;

  z-index: 2;

  left: 70px;
  top: 115px;

  background-color: ${({ theme }) => theme.snWhite};
`;

const cssAnimationByIndex = css`
  animation-name: ${keyframeLoading};
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  animation-delay: ${({ index }) => (index * 0.1).toFixed(1)}s;
`;

const LoaderLetters = styled.p`
  margin-top: 20px;

  text-align: center;
  font-weight: 700;
  font-size: ${FONT_SIZE.X_LARGE};
  color: ${({ theme }) => theme.snGreyIcon};
`;

const LoadingSpan = styled.span`
  ${cssAnimationByIndex}
  display: inline-block;
`;

const LOADING_STR = "LOADING...";
export default function LoaderNappy() {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoBw src={srcLogoBw} alt="Snappy 흑백 로고입니다." />
        <StyledSpinner></StyledSpinner>
        <LoaderLetters>
          {React.Children.toArray(
            LOADING_STR.split("").map((char, index) => (
              <LoadingSpan index={index}>{char}</LoadingSpan>
            ))
          )}
        </LoaderLetters>
      </LogoWrapper>
    </Wrapper>
  );
}
