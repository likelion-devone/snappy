import styled from "styled-components";
import nappyBody from "asset/logoBody.png";
import nappyArm from "asset/logoArm.png";
import splashWH from "asset/SplashWH.png";
import splashYN from "asset/SplashYN.png";

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

const NappyBody = styled.img`
  transform: translate(40px);
  width: 150px;
  z-index: 1;
`;

const NappyArm = styled.img`
  width: 50px;
  position: absolute;
  transform-origin: 50px 123px;
  z-index: 1;
  top: -150px;
  left: -4.7px;

  animation: wave 0.6s linear infinite;
  @keyframes wave {
    7% {
      transform: rotateZ(0);
    }

    50% {
      transform: rotateZ(15deg);
    }

    100% {
      transform: rotateZ(0);
    }
  }
`;

const NappyEffect = styled.div`
  position: relative;
`;

const SplashWH = styled.img`
  position: absolute;
  left: 135px;
  bottom: 20px;
  width: 70px;
  transform: translate(-20px);
  z-index: 2;
`;

const SplashYN = styled.img`
  position: absolute;
  left: 135px;
  bottom: 20px;
  width: 70px;
  transform: translate(-20px);
  z-index: 2;
  transition: 0.3s;
  animation-name: fadeInOut;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.3s;
  animation-direction: alternate;
  @keyframes fadeInOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default function NotFoundErrorPage() {
  return (
    <>
      <Wrapper>
        <LogoWrapper>
          <NappyEffect>
            <SplashWH src={splashWH} alt="스플래시 하얀색 입니다." />
            <SplashYN src={splashYN} alt="스플래시 노란색 입니다." />
            <NappyArm src={nappyArm} alt="네피 팔 입니다." />
          </NappyEffect>
          <NappyBody src={nappyBody} alt="Snappy 흑백 로고입니다." />
        </LogoWrapper>
      </Wrapper>
    </>
  );
}
