import { Outlet } from "react-router-dom";
import styled from "styled-components";

import TopNav from "../TopNav";
import GlobalNav from "../GlobalNav";
import AuthProvider from "lib/auth/AuthProvider";

import { GLOBAL_NAVBAR_HEIGHT, MAX_WIDTH, MIN_WIDTH, TOP_NAVBAR_HEIGHT } from "constant/style";

const LayoutStyle = styled.main`
  margin: calc(${TOP_NAVBAR_HEIGHT} + 10px) auto calc(${GLOBAL_NAVBAR_HEIGHT} + 10px);

  padding: 0 15px;

  width: min(${MAX_WIDTH}, 100%);
  min-width: ${MIN_WIDTH};
`;

function Layout() {
  return (
    <>
      <TopNav />
      <LayoutStyle>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <GlobalNav />
      </LayoutStyle>
    </>
  )
}

export default Layout;