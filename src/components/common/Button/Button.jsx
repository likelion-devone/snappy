import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  display: inline-block;
  color: #fff;
  font-size: 14px;
  background-color: #33afd8;

  ${({ state }) => stateStyleMap[state] ?? ""}

  ${({ size }) => sizeStyleMap[size] ?? ""}
`;

const stateStyleMap = {
  disabled: css`
    background-color: #85cfe8;
    pointer-events: none;
  `,
  activated: css`
    background-color: #ffffff;
    color: #767676;
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
  size: PropTypes.oneOf(["xs", "sm", "md", "lg34", "lg44", "xl"]).isRequired,
  state: PropTypes.oneOf(["disabled", "abled", "activated"]).isRequired,
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
