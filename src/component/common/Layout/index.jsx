import { Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";

import { GlobalNav, TopNav, TopNavProvider } from "component/common/Navbar";

import routeResolver from "util/routeResolver";

import { GLOBAL_NAVBAR_HEIGHT, MAX_WIDTH, TOP_NAVBAR_HEIGHT } from "constant/style";
import ROUTE, { ROUTE_CHAT, ROUTE_POST, ROUTE_PRODUCT, ROUTE_PROFILE } from "constant/route";
import { cssLayout } from "./style";

const LayoutStyle = styled.main`
  padding: ${TOP_NAVBAR_HEIGHT} 15px ${({ $isFullScreen }) => $isFullScreen ? "10px" : `calc(${GLOBAL_NAVBAR_HEIGHT} + 10px)`};
  ${cssLayout}

  @media (min-width: ${MAX_WIDTH}) {
    padding: ${TOP_NAVBAR_HEIGHT} 15px 10px;
    
    ${({ $isFullScreen }) => !$isFullScreen && "margin-left: 200px;"};
  }
`;

function Layout() {
  const isPostDetailPage = useMatch(routeResolver(ROUTE.POST, ":postId"));
  const isPostEditPage = useMatch(routeResolver(ROUTE.POST, ":postId", ROUTE_POST.EDIT));
  const isPostUploadPage = useMatch(routeResolver(ROUTE.POST));
  const isProfileEditPage = useMatch(routeResolver(ROUTE.PROFILE, ROUTE_PROFILE.EDIT));
  const isProductEditPage = useMatch(routeResolver(ROUTE.PRODUCT, ROUTE_PRODUCT.EDIT));
  const isProductAddPage = useMatch(routeResolver(ROUTE.PRODUCT, ROUTE_PRODUCT.ADD));
  const isChatRoomPage = useMatch(routeResolver(ROUTE.CHAT, ROUTE_CHAT.CHATROOM));

  const isFullScreen =
    isPostDetailPage
    || isPostEditPage
    || isPostUploadPage
    || isProfileEditPage
    || isProductEditPage
    || isProductAddPage
    || isChatRoomPage

  return (
    <TopNavProvider>
      <TopNav />
      <LayoutStyle $isFullScreen={isFullScreen}>
        <Outlet />
        {!isFullScreen && <GlobalNav />}
      </LayoutStyle>
    </TopNavProvider>
  );
}

export default Layout;