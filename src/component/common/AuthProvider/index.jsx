import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

import { req } from "lib/api";
import useAPI from "hook/useAPI";
import { getValidToken } from "lib/auth";
import { removeTokenOnLocalStorage } from "lib/storage/localStorage";

import ROUTE from "constant/route";

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
 * @typedef {({email: string, password: string}) => void} LoginHandler
 * @description 로그인시 사용하는 함수
 */
/**
 * @typedef {() => void} LogoutHandler
 * @description 로그아웃시 사용하는 함수
 */
/**
 * @typedef {Object.} LogoutHandler
 * @description 로그아웃시 사용하는 함수
 */

/**
 * @type {React.Context<{authInfo: UserInfo | null, handleLogin: LoginHandler, handleLogout: LogoutHandler }>}
 */
export const AuthContext = createContext();

/**
 * Context API를 활용해 authInfo를 제공하는 컴포넌트
 * 
 * 로컬 스토리지에 token이 있다면 자동 로그인을 수행하고, 그렇지 않다면 로그인 페이지로 리다이렉트합니다.
 * 
 * 개발 환경에서는 개발용 계정으로 자동 로그인합니다.
 */
export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [authInfo, setAuthInfo] = useState(null);
  const [____, authInfoLoaded, ___, getAuthInfo] = useAPI(
    req.user.authInfo
  );
  const [_____, _, __, login] = useAPI(
    req.noAuth.user.login
  );

  const loginWithToken = useCallback(async () => {
    const token = await getValidToken();

    if (!token) {
      navigate(ROUTE.LOGIN, { relative: false });
      return;
    }

    if (!authInfo && !authInfoLoaded) {
      getAuthInfo().then((result) => {
        const { user } = result
        setAuthInfo(user);
        if ([ROUTE.LOGIN, ROUTE.LANDING].includes(location.pathname)) {
          navigate(ROUTE.HOME, { relative: false })
        }
      })
    }
  }, [navigate, getAuthInfo, authInfoLoaded, authInfo, location])

  useEffect(() => {
    loginWithToken();
  }, [loginWithToken])

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && authInfo) {
      console.info("개발용 계정 정보: ", authInfo);
    }
  }, [authInfo])

  /**
   * @type {LoginHandler} 
   */
  const handleLogin = useCallback(
    async ({ email, password }) => {
      login({ email, password });
    }, [login]);

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
      authInfo, handleLogin, handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node
}
