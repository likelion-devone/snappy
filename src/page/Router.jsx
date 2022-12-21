import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalNav from "component/common/GlobalNav";
import TopNav from "component/common/TopNav";
import AuthProvider from "lib/auth/AuthProvider";
import Layout from "component/common/Layout";

import LandingPage from "./Landing";
import LoginPage from "./Login";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import PostPage from "./Post";
import ChatPage from "./Chat";
import NotFoundErrorPage from "./404";

import ROUTE from "constant/route";

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
            <Route path="*" element={<NotFoundErrorPage />} />
          </Routes>
          <GlobalNav />
        </Layout>
      </AuthProvider>
    </Router>
  )
}