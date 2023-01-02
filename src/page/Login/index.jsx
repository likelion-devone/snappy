import { useEffect, useState } from "react"
import styled from "styled-components"

import LoginModal from "component/Login/LoginModal";
import { SplashNappy } from "component/common/Animation/index";

import Title from "asset/title-main-291051.png";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 100vw;

  background-color: ${({ theme }) => theme.snBlue};
`

const LogoWrapper = styled.h1`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  .title-logo {
    margin-top: 30px;
  }
`

export default function LoginPage() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    setIsModalOpened(true);
  }, [])

  return (
    <Wrapper>
      <LogoWrapper>
        <SplashNappy />
        <img src={Title} alt="Snappy 타이틀 로고입니다." className="title-logo" width={291} height={51} />
      </LogoWrapper>
      <LoginModal $isModalOpened={isModalOpened} />
    </Wrapper>
  )
}