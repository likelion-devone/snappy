import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import LoginButton from "../LoginButton/index";

import LogoKakao from "asset/social/kakao.png";
import LogoGoogle from "asset/social/google.png";
import LogoFacebook from "asset/social/facebook.png";

import { FONT_SIZE } from "constant/style"
import ROUTE, { ROUTE_LOGIN } from "constant/route";

import routeResolver from "util/routeResolver";

const LoginModalWrapper = styled.main`
  width: 100%;
  height: ${({ $isModalOpened }) => $isModalOpened ? "320px" : "0"};

  padding-top: 50px;

  text-align: center;

  background-color: ${({ theme }) => theme.snWhite};

  transition: all 1s ease;

  border-top-right-radius: 44px;
  border-top-left-radius: 44px;
`

const StyledLink = styled(Link)`
  display: inline-block;

  margin-top: 10px;

  font-weight: 400;
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 15px;

  color: ${({ theme }) => theme.snGreyIcon};

  :last-child {
    position: relative;
    margin-left: 28px;

    ::before {
      content: "";

      position: absolute;

      left: -14px;

      width: 1px;
      height: 13px;

      background-color: #C4C4C4;
    }
  }
`

export default function LoginModal({ $isModalOpened }) {
  return (
    <LoginModalWrapper $isModalOpened={$isModalOpened}>
      <LoginButton src={LogoKakao} providerName="카카오톡" color="#F2C94C" />
      <LoginButton src={LogoGoogle} providerName="구글" color="#767676" />
      <LoginButton src={LogoFacebook} providerName="페이스북" color="#33AFD8" />
      <StyledLink to={ROUTE_LOGIN.AUTHORIZE} relative={true}>이메일로 로그인</StyledLink>
      <StyledLink to={routeResolver(ROUTE.LOGIN, ROUTE_LOGIN.JOIN, "1")} relative={true}>회원가입</StyledLink>
    </LoginModalWrapper>
  )
}

LoginModal.propTypes = {
  $isModalOpened: PropTypes.bool
}