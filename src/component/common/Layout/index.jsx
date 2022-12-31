import { Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";

import { GlobalNav, TopNav, TopNavProvider } from "component/common/Navbar";

import { GLOBAL_NAVBAR_HEIGHT, MAX_WIDTH, MIN_WIDTH, TOP_NAVBAR_HEIGHT } from "constant/style";
import routeResolver from "util/routeResolver";
import ROUTE, { ROUTE_CHAT, ROUTE_POST, ROUTE_PRODUCT, ROUTE_PROFILE } from "constant/route";

const LayoutStyle = styled.main`
  margin-top: calc(${TOP_NAVBAR_HEIGHT} + 10px);
  margin-bottom: ${({ $isFullScreen }) => $isFullScreen ? "10px" : `calc(${GLOBAL_NAVBAR_HEIGHT} + 10px)`};
  margin-left: auto;
  margin-right: auto;

  padding: 0 15px;

  width: min(${MAX_WIDTH}, 100%);
  min-width: ${MIN_WIDTH};
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