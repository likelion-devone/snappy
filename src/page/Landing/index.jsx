import styled from "styled-components";

import Title from "asset/title-main-291051.png";
import { SplashNappy } from "component/common/Animation/index";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.snBlue};

  transition: all 1s ease-in-out;

  img.title-logo {
    margin-top: 50px;
  }
`

export default function LandingPage() {
  return (
    <Wrapper>
      <SplashNappy />
      <img src={Title} alt="Snappy 타이틀 로고입니다." className="title-logo" width={291} height={51} />
    </Wrapper>
  )
}