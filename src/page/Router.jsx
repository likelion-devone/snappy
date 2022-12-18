import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import GlobalNav from "component/common/GlobalNav";
import TopNav from "component/common/TopNav";

import LandingPage from "./Landing/index";
import LoginPage from "./Login/index";
import HomePage from "./Home/index";
import ProfilePage from "./Profile/index";
import PostPage from "./Post/index";
import ChatPage from "./Chat/index";
import NotFoundErrorPage from "./404/index";

import ROUTE from "constant/route";
import { GLOBAL_NAVBAR_HEIGHT, TOP_NAVBAR_HEIGHT } from "constant/style";

const Layout = styled.main`
  margin-top: calc(${TOP_NAVBAR_HEIGHT} + 10px);
  margin-bottom: calc(${GLOBAL_NAVBAR_HEIGHT} + 10px);
  flex-grow: 1;
  max-width: 1024px;
  min-width: 390px;
`;

export default function AppRouter() {
  return (
    <Router>
      <TopNav />
      <Layout>
        <Routes>
          <Route path={ROUTE.LANDING} element={<LandingPage />} />
          <Route path={ROUTE.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTE.POST} element={<PostPage />} />
          <Route path={ROUTE.CHAT} element={<ChatPage />} />
          <Route
            path="*"
            element={<NotFoundErrorPage />}
          />
        </Routes>
        <GlobalNav />
      </Layout>
    </Router>
  )
}