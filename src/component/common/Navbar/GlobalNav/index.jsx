import styled from "styled-components";

import { GLOBAL_NAVBAR_HEIGHT } from "constant/style";
import { NavLink } from "./component/index";
import { cssNavbar } from "../style/css";

const GlobalNavStyle = styled.nav`
  ${cssNavbar}
  
  justify-content: space-around;
  bottom: 0;

  height: ${GLOBAL_NAVBAR_HEIGHT};

  border-top: 1px solid ${({ theme }) => theme.snGreyOff};
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

