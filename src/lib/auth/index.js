import {
  removeTokenOnLocalStorage,
  getTokenFromLocalStorage,
  setTokenOnLocalStorage,
} from "lib/storage/localStorage";
import { req, server } from "lib/api/index";

/**
 * 로컬 스토리지에 있는 토큰을 가져오거나
 * 개발 환경일 경우 개발용 계정의 토큰을 가져오고 로컬에 저장 후
 * 리턴합니다.
 *
 * @returns {string | null} 토큰
 */
const getToken = async () => {
  if (process.env.NODE_ENV === "development") {
    const {
      user: { token },
    } = await server.noAuth(req.noAuth.user.login, {
      email: process.env.REACT_APP_DEV_ID,
      password: process.env.REACT_APP_DEV_PASSWORD,
    });

    setTokenOnLocalStorage(token);
    return token;
  }

  const token = getTokenFromLocalStorage();

  if (token) {
    return token;
  }

  return null;
};

/**
 * `getToken`으로 가져온 토큰을 Validate하고
 * 통과하지 못했을 경우 로컬 스토리지에서 토큰을 삭제합니다.
 *
 * @returns {string | nulll} 토큰
 */
const getValidToken = async () => {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const response = await server(req.user.checkToken);

  if ("isValid" in response) {
    if (response.isValid) {
      return token;
    }
  }

  removeTokenOnLocalStorage();
  return null;
};

export { getValidToken };
