import { useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { ValidationInputWrapper } from "component/common/Input";
import LoginLayout from "component/Login/Layout";
import useAPI from "hook/useAPI";
import useValidationInput from "hook/useValidationInput";
import { req } from "lib/api";
import Button from "component/common/Button/index";

import { validateEmail as validateEmailOnLocal, validatePassword as validatePasswordOnLocal } from "util/validation";
import routeResolver from "util/routeResolver";

import { JoinDataContext } from "../index";

import ROUTE, { ROUTE_LOGIN } from "constant/route";
import { BUTTON_STATE } from "constant/button_state";
import { BUTTON_SIZE } from "constant/size";

const JoinForm = styled.form`
  text-align: center;
`

export default function JoinPageOne() {
  const navigate = useNavigate();
  const { dispatchJoinData } = useContext(JoinDataContext);

  const [isEmailValidationLoading, emailValidationResult, _emailValidationError, validateEmailOnServer] = useAPI(req.noAuth.user.checkEmail);

  const validateEmail = async (value) => {
    const emailCheckedOnLocal = validateEmailOnLocal(value);
    if (emailCheckedOnLocal) {
      return { message: emailCheckedOnLocal };
    }

    return await validateEmailOnServer({ email: value });
  }

  const [emailRef, handleEmailValidation, emailValidationErrorMessage, _] = useValidationInput(validateEmail);
  const [passwordRef, handlePasswordValidation, passwordValidationErrorMessage, isPasswordValidationPassed] = useValidationInput(validatePasswordOnLocal);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEmailValidation();
    handlePasswordValidation();
  }

  useEffect(() => {
    if (emailValidationResult && (emailValidationErrorMessage === "사용 가능한 이메일 입니다.") && isPasswordValidationPassed) {
      dispatchJoinData({ type: "email", payload: emailRef.current.value });
      dispatchJoinData({ type: "password", payload: passwordRef.current.value });
      navigate(routeResolver(ROUTE.LOGIN, ROUTE_LOGIN.JOIN, "2"));
    }
  }, [emailValidationResult, emailValidationErrorMessage, isPasswordValidationPassed, navigate, dispatchJoinData, emailRef, passwordRef])

  return (
    <LoginLayout title="이메일로 회원가입">
      <JoinForm onSubmit={handleSubmit}>
        <ValidationInputWrapper errorMessage={emailValidationErrorMessage}>
          <ValidationInputWrapper.Input ref={emailRef} id="email" type="email" labelText="이메일" placeholder="이메일 주소를 입력해 주세요." />
          <ValidationInputWrapper.ErrorMessage $isValid={emailValidationErrorMessage === "사용 가능한 이메일 입니다."} />
          {/* TODO: ErrorMessage가 아닌 InfoMessage로 바꾸고, valid / invalid 판단해 색 바꾸기 */}
        </ValidationInputWrapper>
        <ValidationInputWrapper errorMessage={passwordValidationErrorMessage}>
          <ValidationInputWrapper.Input ref={passwordRef} id="password" type="password" labelText="비밀번호" placeholder="비밀번호를 설정해 주세요." />
          <ValidationInputWrapper.ErrorMessage />
        </ValidationInputWrapper>
        <Button size={BUTTON_SIZE.X_LARGE} state={isEmailValidationLoading ? BUTTON_STATE.X_LARGE.DISABLED : BUTTON_STATE.X_LARGE.ABLED} type="submit">다음</Button>
      </JoinForm>
    </LoginLayout>
  )
}