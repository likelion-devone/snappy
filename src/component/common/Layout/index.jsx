import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { GlobalNav, TopNav, TopNavProvider } from "component/common/Navbar";

import { GLOBAL_NAVBAR_HEIGHT, MAX_WIDTH, MIN_WIDTH, TOP_NAVBAR_HEIGHT } from "constant/style";

const LayoutStyle = styled.main`
  margin: calc(${TOP_NAVBAR_HEIGHT} + 10px) auto calc(${GLOBAL_NAVBAR_HEIGHT} + 10px);

  padding: 0 15px;

  width: min(${MAX_WIDTH}, 100%);
  min-width: ${MIN_WIDTH};
`;

function Layout() {
  return (
    <TopNavProvider>
      <TopNav />
      <LayoutStyle>
        <Outlet />
        <GlobalNav />
      </LayoutStyle>
    </TopNavProvider>
  )
}

export default Layout;