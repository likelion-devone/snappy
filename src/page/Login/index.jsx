import { useEffect, useState } from "react"
import styled from "styled-components"

import LoginModal from "./component/LoginModal";

import srcLogoBw from "asset/logo-bw-212262.png";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 100vw;

  background-color: ${({ theme }) => theme.snBlue};
`

const LogoWrapper = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
`

const LogoBw = styled.img`
  display: block;
  
  width: 212px;
  height: 262px;

  transform: translate(-20px);
`

export default function LoginPage() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    setIsModalOpened(true);
  }, [])

  return (
    <Wrapper>
      <LogoWrapper>
        <LogoBw src={srcLogoBw} alt="Snappy 흑백 로고입니다." />
      </LogoWrapper>
      <LoginModal $isModalOpened={isModalOpened} />
    </Wrapper>
  )
}