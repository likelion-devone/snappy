import { useContext } from "react";
import { AuthContext } from "lib/auth/AuthProvider";

/**
 * user info가 필요한 경우 사용하는 Custom Hook
 *
 * @returns {import('lib/auth/AuthProvider').UserInfo} UserInfo
 */
export default function useAuthInfo() {
  const { authInfo } = useContext(AuthContext);
  return authInfo;
}
