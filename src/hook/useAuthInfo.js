import { AuthContext } from "component/common/AuthProvider/index";
import { useContext } from "react";

/**
 * user info가 필요한 경우 사용하는 Custom Hook
 *
 * @returns {import('component/common/AuthProvider').UserInfo} UserInfo
 */
export default function useAuthInfo() {
  const { authInfo } = useContext(AuthContext);
  return authInfo;
}
