import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "component/common/Layout";

import LoginPage from "./Login";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import YourProfilePage from "./Profile/[accountname]";
import PostUploadPage from "./Post/Upload";
import PostDetailPage from "./Post/[postId]";
import ChatPage from "./Chat";
import NotFoundErrorPage from "./404";
import JoinPage from "./Login/Join";
import AuthorizePage from "./Login/Authorize";

import AuthProvider from "lib/auth/AuthProvider";
import ChatRoomPage from "./Chat/ChatRoom";

import ProductPage from "./Product";
import AddProductPage from "./Product/AddProduct/index";
import EditProductPage from "./Product/EditProduct/index";
import JoinPageByPagenum from "./Login/Join/[pagenum]/index";
import FollowerListPage from "./Profile/FollowerListPage/index";
import FollowingListPage from "./Profile/FollowingListPage/index";
import ProfileEditPage from "./Profile/Edit/index";
import PostEditPage from "./Post/Edit/index";

import PostDataProvider from "component/common/PostDataProvider/index";
import PostDetailDataProvider from "component/common/PostDataProvider/PostDetailDataProvider/index";
import IsUploadPossibleProvider from "component/Post/IsUploadPossibleProvider/index";

import ROUTE, {
  ROUTE_LOGIN,
  ROUTE_POST,
  ROUTE_PRODUCT,
  ROUTE_PROFILE,
  ROUTE_CHAT
} from "constant/route";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthProvider />}>
          <Route path={ROUTE.LOGIN}>
            <Route index element={<LoginPage />} />
            <Route path={ROUTE_LOGIN.JOIN} element={<JoinPage />}>
              <Route path=":pagenum" element={<JoinPageByPagenum />} />
              <Route index element={<Navigate to="1" />} />
            </Route>
            <Route path={ROUTE_LOGIN.AUTHORIZE} element={<AuthorizePage />} />
          </Route>
          <Route path={ROUTE.LANDING} element={<></>} />
          {/* 랜딩 페이지는 AuthProvider에서 렌더링합니다. */}
          <Route element={<Layout />}>
            <Route
              path={ROUTE.HOME}
              element={
                <PostDataProvider>
                  <HomePage />
                </PostDataProvider>
              }
            />
            <Route path={ROUTE.PROFILE}>
              <Route
                index
                element={
                  <PostDataProvider>
                    <ProfilePage />
                  </PostDataProvider>
                }
              />
              <Route
                path={ROUTE_PROFILE.EDIT}
                element={<ProfileEditPage />}
              />
              <Route path=":accountname">
                <Route
                  index
                  element={
                    <PostDataProvider>
                      <YourProfilePage />
                    </PostDataProvider>
                  }
                />
                <Route
                  path={ROUTE_PROFILE.FOLLOWER}
                  element={<FollowerListPage />}
                />
                <Route
                  path={ROUTE_PROFILE.FOLLOWING}
                  element={<FollowingListPage />}
                />
              </Route>
            </Route>
            <Route path={ROUTE.POST}>
              <Route
                index
                element={
                  <IsUploadPossibleProvider>
                    <PostUploadPage />
                  </IsUploadPossibleProvider>
                }
              />
              <Route path=":postId">
                <Route
                  index
                  element={
                    <PostDetailDataProvider>
                      <PostDetailPage />
                    </PostDetailDataProvider>
                  }
                />
                <Route
                  path={ROUTE_POST.EDIT}
                  element={
                    <PostDetailDataProvider>
                      <IsUploadPossibleProvider>
                        <PostEditPage />
                      </IsUploadPossibleProvider>
                    </PostDetailDataProvider>
                  }
                />
              </Route>
            </Route>
            <Route path={ROUTE.PRODUCT} element={<ProductPage />}>
              <Route index element={<Navigate to={ROUTE.HOME} />} />
              <Route path={ROUTE_PRODUCT.ADD} element={<AddProductPage />} />
              <Route path=":productid">
                {/* TODO: 제품 상세 페이지 개발 */}
                <Route index element={<Navigate to={ROUTE_PRODUCT.EDIT} />} />
                <Route
                  path={ROUTE_PRODUCT.EDIT}
                  element={<EditProductPage />}
                />
              </Route>
            </Route>
            <Route path={ROUTE.CHAT}>
              <Route index element={<ChatPage />} />
              <Route path={ROUTE_CHAT.CHATROOM} element={<ChatRoomPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundErrorPage />} />
      </Routes>
    </Router>
  );
}
