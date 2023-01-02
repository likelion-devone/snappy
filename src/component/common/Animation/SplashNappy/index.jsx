import styled, { keyframes } from "styled-components";
import nappyBody from "asset/logoBody.png";
import nappyArm from "asset/logoArm.png";
import splashWH from "asset/SplashWH.png";
import splashYN from "asset/SplashYN.png";

const keyframeFadeInOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const keyframeWave = keyframes`
  7% {
    transform: rotateZ(0);
  }
  50% {
    transform: rotateZ(15deg);
  }
  100% {
    transform: rotateZ(0);
  }
`

const NappyBody = styled.img`
  position: relative;

  left: 40px;
  width: 150px;
  z-index: 20;
`;

const NappyArm = styled.img`
  width: 50px;
  position: absolute;
  transform-origin: 50px 123px;
  z-index: 10;

  top: -50px;

  animation: ${keyframeWave} 0.6s linear infinite;
`;

const NappyEffect = styled.div`
  margin: 0 auto;

  position: relative;

  width: fit-content;

  transform: translate(-35px);
`;

const SplashWH = styled.img`
  position: absolute;
  left: 120px;
  top: -10px;

  width: 70px;
  z-index: 30;
`;

const SplashYN = styled.img`
  position: absolute;
  left: 120px;
  top: -10px;

  width: 70px;
  z-index: 30;
  animation-name: ${keyframeFadeInOut};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.3s;
  animation-direction: alternate;
`;

export default function SplashNappy() {
  return (
    <NappyEffect>
      <SplashWH src={splashWH} alt="스플래시 하얀색 입니다." />
      <SplashYN src={splashYN} alt="스플래시 노란색 입니다." />
      <NappyArm src={nappyArm} alt="네피 팔 입니다." />
      <NappyBody src={nappyBody} alt="Snappy 흑백 로고입니다." />
    </NappyEffect>
  );
}
