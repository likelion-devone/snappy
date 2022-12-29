import { useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "component/common/Button/index";
import { LabeledInput } from "component/common/Input";
import LoginLayout from "component/Login/Layout/index";
import ErrorMessage from "component/common/Input/ValidationInput/ErrorMessage/index";

import { AuthContext } from "lib/auth/AuthProvider/index";

import routeResolver from "util/routeResolver";
import { validateEmail, validatePassword } from "util/validation";

import ROUTE, { ROUTE_LOGIN } from "constant/route";
import { BUTTON_STATE } from "constant/button_state";
import { BUTTON_SIZE } from "constant/size";
import { FONT_SIZE } from "constant/style";

const LoginForm = styled.form`
  text-align: center;
`

const StyledLink = styled(Link)`
  display: block;
  width: fit-content;
  margin: 20px auto 0;

  font-weight: 400;
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 15px;

  color: ${({ theme }) => theme.snGreyIcon};
`

export default function AuthorizePage() {
  const inpEmailRef = useRef(null);
  const inpPasswordRef = useRef(null);

  const { handleLogin, loginError: loginErrorServerSide, isLoggingIn } = useContext(AuthContext);
  const [loginErrorClientSide, setLoginErrorClientSide] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginErrorClientSide(null);

    const email = inpEmailRef.current.value, password = inpPasswordRef.current.value

    /* 클라이언트 사이드 validation */
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setLoginErrorClientSide(emailValidationError || passwordValidationError);
    if (emailValidationError || passwordValidationError) {
      return;
    }

    await handleLogin({
      email,
      password,
    });
  }

  return (
    <LoginLayout title="로그인">
      <LoginForm onSubmit={handleSubmit}>
        <LabeledInput ref={inpEmailRef} id="email" type="email" labelText="이메일" />
        <LabeledInput ref={inpPasswordRef} id="password" type="password" labelText="비밀번호" />
        {loginErrorClientSide && <ErrorMessage>{loginErrorClientSide}</ErrorMessage>}
        {(!loginErrorClientSide && loginErrorServerSide) && <ErrorMessage>{loginErrorServerSide.message}</ErrorMessage>}
        <Button size={BUTTON_SIZE.X_LARGE} state={isLoggingIn ? BUTTON_STATE.X_LARGE.DISABLED : BUTTON_STATE.X_LARGE.ABLED} type="submit">로그인</Button>
      </LoginForm>
      <StyledLink to={routeResolver(ROUTE.LOGIN, ROUTE_LOGIN.JOIN)}>이메일로 회원가입</StyledLink>
    </LoginLayout>
  )
}