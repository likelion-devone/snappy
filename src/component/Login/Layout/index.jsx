import styled from "styled-components"
import PropTypes from "prop-types";
import { FONT_SIZE, MAX_WIDTH, MIN_WIDTH } from "constant/style";
import { Link } from "react-router-dom";
import ROUTE from "constant/route";

const Title = styled.h1`
  margin: 24px auto 40px;

  font-weight: 500;
  font-size: ${FONT_SIZE.XX_LARGE};
  line-height: 30px;
  text-align: center;

  color: ${({ theme }) => theme.snBlack};
`
const Subtitle = styled.p`
  margin: -28px auto 30px;

  font-weight: 400;
  font-size: ${FONT_SIZE.BASE};
  line-height: 14px;
  text-align: center;

  color: ${({ theme }) => theme.snGreyIcon};
`

const Wrapper = styled.main`
  margin: 0 auto 20px;
  padding: 0 15px;

  width: min(${MAX_WIDTH}, 100%);
  min-width: ${MIN_WIDTH};

  text-align: center;
`

const StyledLink = styled(Link)`
  display: block;
  text-align: center;

  font-weight: 400;
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 15px;

  color: ${({ theme }) => theme.snGreyIcon};
`

export default function LoginLayout({ title, subtitle, children }) {
  return (
    <>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Wrapper>{children}</Wrapper>
      <StyledLink to={ROUTE.LOGIN}>로그인으로 돌아가기</StyledLink>
    </>
  )
}

LoginLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node
}