import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "component/common/Button";
import LoginLayout from "component/Login/Layout";
import { ProfileForm } from "component/common/Form";
import { JoinDataContext } from "..";

import useAPI from "hook/useAPI";

import ROUTE, { ROUTE_LOGIN } from "constant/route";
import { BUTTON_STATE } from "constant/button_state";
import { BUTTON_SIZE } from "constant/size";

import routeResolver from "util/routeResolver";
import { req } from "lib/api";
import { AuthContext } from "lib/auth/AuthProvider";

export default function JoinPageTwo() {
  const navigate = useNavigate();
  const { joinData, dispatchJoinData } = useContext(JoinDataContext);
  const { handleLogin } = useContext(AuthContext);

  const [isUserCreating, createUserResult, createUserError, createUser] = useAPI(req.noAuth.user.create);

  useEffect(() => {
    if (joinData.email && joinData.password && joinData.accountname && joinData.image && joinData.username) {
      createUser(joinData);
    } else if (!joinData.email || !joinData.password) {
      navigate(routeResolver(ROUTE.LOGIN, ROUTE_LOGIN.JOIN, "1"));
    }
  }, [joinData, navigate, createUser]);

  useEffect(() => {
    if (createUserResult) {
      const { email, password } = joinData;

      handleLogin({ email, password });
      return;
    }
  }, [createUserResult, handleLogin, joinData]);

  useEffect(() => {
    if (createUserError) {
      console.error(createUserError);
      dispatchJoinData({ type: "reset" });
      navigate(routeResolver(ROUTE.LOGIN, ROUTE_LOGIN.JOIN, "1"));
    }
  }, [createUserError, navigate, dispatchJoinData]);

  return (
    <LoginLayout title="프로필 설정" subtitle="나중에 언제든지 변경할 수 있습니다.">
      <ProfileForm
        dispatchProfileData={dispatchJoinData}
        formId="profileForm"
      />
      <Button
        size={BUTTON_SIZE.X_LARGE}
        state={isUserCreating ? BUTTON_STATE.X_LARGE.DISABLED : BUTTON_STATE.X_LARGE.ABLED}
        form="profileForm"
        type="submit"
      >
        Snappy 시작하기 📷
      </Button>
    </LoginLayout>
  )
}