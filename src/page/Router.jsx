import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "component/common/Layout";

import LoginPage from "./Login";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import PostPage from "./Post";
import ChatPage from "./Chat";
import NotFoundErrorPage from "./404";
import JoinPage from "./Login/page/Join";
import AuthorizePage from "./Login/page/Authorize";

import AuthProvider from "lib/auth/AuthProvider";

import ROUTE, { ROUTE_LOGIN } from "constant/route";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE.LOGIN} >
          <Route index element={<LoginPage />} />
          <Route path={ROUTE_LOGIN.JOIN} element={<JoinPage />} />
          <Route path={ROUTE_LOGIN.AUTHORIZE} element={<AuthorizePage />} />
        </Route>
        <Route element={<AuthProvider />}>
          <Route path={ROUTE.LANDING} element={<></>} /> {/* 랜딩 페이지는 AuthProvider에서 렌더링합니다. */}
          <Route element={<Layout />}>
            <Route path={ROUTE.HOME} element={<HomePage />} />
            <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTE.POST} element={<PostPage />} />
            <Route path={ROUTE.CHAT} element={<ChatPage />} />
            <Route path="*" element={<NotFoundErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}