import styled from "styled-components"
import PropTypes from "prop-types";

import { cssLayout } from "component/common/Layout/style";

import { FONT_SIZE } from "constant/style";

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
  padding: 1px 15px 0;
  text-align: center;

  ${cssLayout}
`

export default function LoginLayout({ title, subtitle, children }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Wrapper>
  )
}

LoginLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node
}