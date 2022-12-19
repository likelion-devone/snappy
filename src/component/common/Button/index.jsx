import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import { BUTTON_SIZE } from "constant/size";
import { BUTTON_STATE } from "constant/button_state";
import { FONT_SIZE } from "constant/style";

const StyledButton = styled.button`
  display: inline-block;
  color: ${({ theme }) => theme.snWhite};
  font-size: ${FONT_SIZE.BASE};
  background-color: ${({ theme }) => theme.snBlue};

  ${({ state }) => stateStyleMap[state] ?? ""}

  ${({ size }) => sizeStyleMap[size] ?? ""}
`;

const stateStyleMap = {
  disabled: css`
    background-color: ${({ theme }) => theme.snDisabled};
    pointer-events: none;
  `,
  activated: css`
    background-color: ${({ theme }) => theme.snWhite};
    color: ${({ theme }) => theme.snGrayIcon};
  `,
};

const sizeStyleMap = {
  xs: css`
    width: 56px;
    height: 28px;
    border-radius: 26px;
  `,
  sm: css`
    width: 90px;
    height: 32px;
    border-radius: 26px;
  `,
  md: css`
    width: 100px;
    height: 34px;
    border-radius: 32px;
  `,
  lg34: css`
    width: 120px;
    height: 34px;
    border-radius: 30px;
  `,
  lg44: css`
    width: 120px;
    height: 44px;
    border-radius: 44px;
  `,
  xl: css`
    width: 322px;
    height: 44px;
    border-radius: 44px;
  `,
};

Button.propTypes = {
  size: PropTypes.oneOf(Object.values(BUTTON_SIZE)).isRequired,
  state: PropTypes.oneOf(Object.values(BUTTON_STATE)).isRequired,
  children: PropTypes.string.isRequired,
  callbacks: PropTypes.object.isRequired,
};

export default function Button({ ...props }) {
  const { size, state, children, callbacks } = props;

  return (
    <StyledButton size={size} state={state} onClick={callbacks[state]}>
      {children}
    </StyledButton>
  );
}
