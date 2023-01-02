import React from "react";
import styled, { css, keyframes } from "styled-components";
import { FONT_SIZE } from "constant/style";
import srcLogoBw from "asset/logo-bw-212262.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.snWhite};
`;

const LogoWrapper = styled.h1`
  flex: 1;
  display: flex;
  align-items: center;
`;

const LogoBw = styled.img`
  width: 212px;
  height: 262px;
  transform: translate(-20px);
  z-index: 1;
`;

const LoaderImg = styled.div`
  position: relative;
  z-index: 2;
  left: 209px;
  bottom: -8px;
`;

const LoaderWord = styled.div`
  position: relative;
  z-index: 2;
  padding-top: 10px;
  left: 145px;
  bottom: -150px;
`;

//loading 카메라 랜즈 에니메이션
const SpinnerInLens = styled.div`
  .loader {
    width: 45px;
    height: 45px;
    background-color: white;
    border: 5px solid;
    border-color: ${({ theme }) => theme.snGreyIcon} transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${keyframeRotation} 1s linear infinite;
  }
`;

const keyframeRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

//loading 단어 에니메이션
const keyframeLoading = keyframes`
  0% {
    scale: 1;
  }
  100% {
    scale: 0.5;
  }
`;

const cssAnimationByIndex = css`
  animation-name: ${keyframeLoading};
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  animation-delay: ${({ index }) => (index * 0.1).toFixed(1)}s;
`;

const Loader = styled.p`
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
        <LoaderImg>
          <SpinnerInLens>
            <span className="loader"></span>
          </SpinnerInLens>
        </LoaderImg>
        <LoaderWord>
          <Loader>
            {React.Children.toArray(
              LOADING_STR.split("").map((char, index) => (
                <LoadingSpan index={index}>{char}</LoadingSpan>
              ))
            )}
          </Loader>
        </LoaderWord>
        <LogoBw src={srcLogoBw} alt="Snappy 흑백 로고입니다." />
      </LogoWrapper>
    </Wrapper>
  );
}
