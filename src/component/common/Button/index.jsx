import styled from "styled-components";
import PropTypes from "prop-types";

import { BUTTON_SIZE } from "constant/size";
import { BUTTON_STATE } from "constant/button_state";
import { FONT_SIZE } from "constant/style";

import { sizeStyleMap, stateStyleMap } from "./style";

const Button = styled.button`
  display: inline-block;
  color: ${({ theme }) => theme.snWhite};
  font-size: ${FONT_SIZE.BASE};
  background-color: ${({ theme }) => theme.snBlue};

  ${({ state }) => stateStyleMap[state] ?? ""}

  ${({ size }) => sizeStyleMap[size] ?? ""}
`;

Button.propTypes = {
  ...Button.propTypes,
  size: PropTypes.oneOf(Object.values(BUTTON_SIZE)).isRequired,
  state: PropTypes.oneOf(Object.values(BUTTON_STATE.LARGE_34)).isRequired,
}

export default Button;