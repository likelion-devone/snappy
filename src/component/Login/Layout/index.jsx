import styled from "styled-components"
import PropTypes from "prop-types";
import { FONT_SIZE, MAX_WIDTH, MIN_WIDTH } from "constant/style";

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
  margin: 0 auto;
  padding: 0 15px;

  width: min(${MAX_WIDTH}, 100%);
  min-width: ${MIN_WIDTH};

  text-align: center;
`

export default function LoginLayout({ title, subtitle, children }) {
  return (
    <>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Wrapper>{children}</Wrapper>
    </>
  )
}

LoginLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node
}