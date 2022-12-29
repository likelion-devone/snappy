import { createContext, useEffect, useState, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { req } from "lib/api";
import useAPI from "hook/useAPI";
import { getValidToken } from "lib/auth";
import {
  removeTokenOnLocalStorage,
  setTokenOnLocalStorage,
} from "lib/storage/localStorage";

import ROUTE from "constant/route";
import LandingPage from "page/Landing";

/**
 * @typedef {Object} UserInfo
 * @property {string} _id;
 * @property {string} username;
 * @property {string} accountname;
 * @property {string} image;
 * @property {boolean} isfollow;
 * @property {Array.<string>} following;
 * @property {Array.<string>} follower;
 * @property {number} followerCount;
 * @property {number} followingCount;
 */

/**
 * @typedef {Object} Error
 * @property {string} message;
 * @property {number} status;
 */

/**
 * @typedef {({email: string, password: string}) => void} LoginHandler
 * @description 로그인시 사용하는 함수
 */
/**
 * @typedef {() => void} LogoutHandler
 * @description 로그아웃시 사용하는 함수
 */

/**
 * @type {React.Context<{authInfo: UserInfo | null, handleLogin: LoginHandler, handleLogout: LogoutHandler, loginError: Error | null, isLoggingIn: boolean }>}
 */
export const AuthContext = createContext();

/**
 * Context API를 활용해 authInfo를 제공하는 컴포넌트
 *
 * 로컬 스토리지에 token이 있다면 자동 로그인을 수행하고, 그렇지 않다면 로그인 페이지로 리다이렉트합니다.
 *
 * 개발 환경에서는 개발용 계정으로 자동 로그인합니다.
 */
export default function AuthProvider() {
  const navigate = useNavigate();
  const location = useLocation();

  const [authInfo, setAuthInfo] = useState(null);
  const [
    _isAuthInfoLoading,
    _loadedAuthInfo,
    _authInfoLoadingError,
    getAuthInfo,
  ] = useAPI(req.user.authInfo);
  const [isLoggingIn, _loginResult, loginError, login] = useAPI(
    req.noAuth.user.login
  );

  const [haveTriedAutoLogin, setHaveTriedAutoLogin] = useState(false);

  const loginWithToken = useCallback(async () => {
    const token = await getValidToken();

    if (!token) {
      if (!location.pathname.includes(ROUTE.LOGIN)) {
        navigate(ROUTE.LOGIN, { relative: false });
      }
      return;
    }

    try {
      const result = await getAuthInfo();

      setAuthInfo(result.user);
      if (
        location.pathname.includes(ROUTE.LOGIN) ||
        location.pathname === ROUTE.LANDING
      ) {
        navigate(ROUTE.HOME, { relative: false });
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate, getAuthInfo, location]);

  useEffect(() => {
    if (
      ((location.pathname.includes(ROUTE.LOGIN) ||
        location.pathname === ROUTE.LANDING) &&
        !authInfo) ||
      !haveTriedAutoLogin
    ) {
      setHaveTriedAutoLogin(true);
      loginWithToken();
    }
  }, [loginWithToken, location, authInfo, haveTriedAutoLogin]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && authInfo) {
      console.info("개발용 계정 정보: ", authInfo);
    }
  }, [authInfo]);

  /**
   * @type {LoginHandler}
   */
  const handleLogin = useCallback(
    async ({ email, password }) => {
      try {
        const {
          user: { token },
        } = await login({ email, password });
        setTokenOnLocalStorage(token);
        await loginWithToken();
        navigate(ROUTE.HOME, { relative: false });
      } catch (error) {
        // loginError로 에러 헨들링
      }
    },
    [login, navigate, loginWithToken]
  );

  /**
   * @type {LogoutHandler}
   */
  const handleLogout = useCallback(async () => {
    removeTokenOnLocalStorage();
    setAuthInfo(null);
    navigate(ROUTE.LOGIN);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{
      authInfo, handleLogin, handleLogout, loginError, isLoggingIn
    }}>
      {authInfo ||
        (haveTriedAutoLogin &&
          (location.pathname.includes(ROUTE.LOGIN) ||
            location.pathname === ROUTE.LANDING))
        ? <Outlet />
        : <LandingPage />}
    </AuthContext.Provider>
  );
}
