import { Link } from "react-router-dom";
import styled from "styled-components";

import { GLOBAL_NAVBAR_HEIGHT } from "constant/style";
import ROUTE from "constant/route";

const GlobalNavStyle = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  height: ${GLOBAL_NAVBAR_HEIGHT};

  background-color: darkgrey; /* TODO: Global Nav 개발시 제거 */

  z-index: 100;
`

export default function GlobalNav() {
  return (
    <GlobalNavStyle>
      <Link to={ROUTE.HOME}>홈</Link>
      <Link to={ROUTE.CHAT}>채팅</Link>
      <Link to={ROUTE.POST}>게시물 작성</Link>
      <Link to={ROUTE.PROFILE}>프로필</Link>
    </GlobalNavStyle>
  )
}
