import { Outlet } from "react-router-dom";
import styled from "styled-components";

import TopNav from "../TopNav";
import GlobalNav from "../GlobalNav";
import AuthProvider from "lib/auth/AuthProvider";

import { GLOBAL_NAVBAR_HEIGHT, TOP_NAVBAR_HEIGHT } from "constant/style";

const LayoutStyle = styled.main`
  margin: calc(${TOP_NAVBAR_HEIGHT} + 10px) auto calc(${GLOBAL_NAVBAR_HEIGHT} + 10px);
  flex-grow: 1;
  width: 100%;
  padding: 0 15px;
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