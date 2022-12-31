import { Link } from "react-router-dom";
import styled from "styled-components";

import { FONT_SIZE } from "constant/style";
import ROUTE from "constant/route";

const StyledLink = styled(Link)`
  display: block;
  margin-top: 20px;
  text-align: center;

  font-weight: 400;
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 15px;

  color: ${({ theme }) => theme.snGreyIcon};
`

export default function LinkToLogin() {
  return <StyledLink to={ROUTE.LOGIN}>로그인으로 돌아가기</StyledLink>
}