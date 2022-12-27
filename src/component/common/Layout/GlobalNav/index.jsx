import styled from "styled-components";

import { GLOBAL_NAVBAR_HEIGHT } from "constant/style";
import { NavLink } from "./component/index";

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

  border-top: 1px solid #76767635;

  z-index: 100;
`

export default function GlobalNav() {
  return (
    <GlobalNavStyle>
      <NavLink linkKey="HOME" />
      <NavLink linkKey="CHAT" />
      <NavLink linkKey="POST" />
      <NavLink linkKey="PROFILE" />
    </GlobalNavStyle>
  )
}

