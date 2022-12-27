import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "component/common/Layout";

import LoginPage from "./Login";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import PostUploadPage from "./Post/Upload";
import PostDetailPage from "./Post/[postId]";
import ChatPage from "./Chat";
import NotFoundErrorPage from "./404";

import ROUTE from "constant/route";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTE.LANDING} element={<></>} /> {/* 랜딩 페이지는 AuthProvider에서 렌더링합니다. */}
          <Route path={ROUTE.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTE.POST}>
            <Route index element={<PostUploadPage />} />
            <Route path=":postId" element={<PostDetailPage />} />
          </Route>
          <Route path={ROUTE.CHAT} element={<ChatPage />} />
          <Route path="*" element={<NotFoundErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
