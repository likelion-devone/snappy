import styled from "styled-components";

import Logo from "asset/logo-main-212262.png";
import Title from "asset/title-main-291051.png";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.snBlue};

  transition: all 1s ease-in-out;

  img.logo {
    transform: translate(-20px);
    margin-bottom: 49px;
  }
`

export default function LandingPage() {
  return (
    <Wrapper>
      <img className="logo" src={Logo} alt="" width={212} height={262} />
      <img src={Title} alt="" width={291} height={51} />
    </Wrapper>
  )
}