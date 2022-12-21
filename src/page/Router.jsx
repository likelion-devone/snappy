import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import GlobalNav from "component/common/GlobalNav";
import TopNav from "component/common/TopNav";
import AuthProvider from "component/common/AuthProvider";

import LandingPage from "./Landing";
import LoginPage from "./Login";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import PostPage from "./Post";
import ChatPage from "./Chat";
import NotFoundErrorPage from "./404";

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
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  )
}