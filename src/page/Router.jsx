import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      <Routes>
        <Route path={ROUTE.LOGIN} element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path={ROUTE.LANDING} element={<LandingPage />} />
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTE.POST} element={<PostPage />} />
          <Route path={ROUTE.CHAT} element={<ChatPage />} />
          <Route path="*" element={<NotFoundErrorPage />} />
        </Route>
      </Routes>
    </Router>
  )
}