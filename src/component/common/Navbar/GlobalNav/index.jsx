import styled from "styled-components";

import { GLOBAL_NAVBAR_HEIGHT, MAX_WIDTH, TOP_NAVBAR_HEIGHT } from "constant/style";
import { NavLink } from "./component/index";
import { cssNavbar } from "../style/css";

const GlobalNavStyle = styled.nav`
  ${cssNavbar}
  
  justify-content: space-around;
  bottom: 0;

  height: ${GLOBAL_NAVBAR_HEIGHT};

  border-top: 1px solid ${({ theme }) => theme.snGreyOff};

  @media (min-width: ${MAX_WIDTH}) {
    left: 0;
    bottom: 0;
    height: calc(100vh - ${TOP_NAVBAR_HEIGHT});
    width: 200px;
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.snGreyOff};

    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
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

