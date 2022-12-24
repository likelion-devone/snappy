import PropTypes from "prop-types"
import styled from "styled-components"

import { FONT_SIZE } from "constant/style"

const Button = styled.button`
  display: block;
  margin: 0 auto 10px;

  width: 322px;
  height: 44px;

  padding: 13px;

  font-weight: 400;
  font-size: ${FONT_SIZE.BASE};
  line-height: 18px;
  text-align: center;

  border: 1px solid ${({ color }) => color};
  border-radius: 44px;

  color: ${({ theme }) => theme.snGreyIcon};

  background: url(${({ src }) => src}) no-repeat 14px center/24px;

  transition: all 0.3s ease;

  :hover {
    background-color: ${({ color }) => color}22;
  }
`

export default function LoginButton({ src, providerName, color }) {
  return (
    <Button src={src} color={color}>{providerName}{" "}계정으로 로그인</Button>
  )
}

LoginButton.propTypes = {
  src: PropTypes.string.isRequired,
  providerName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}