import { css } from "styled-components";

const stateStyleMap = {
  disabled: css`
    background-color: ${({ theme }) => theme.snDisabled};
    pointer-events: none;
  `,
  activated: css`
    background-color: ${({ theme }) => theme.snWhite};
    color: ${({ theme }) => theme.snGreyIcon};
    border: 1px solid ${({ theme }) => theme.snBlue};
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

export {
  stateStyleMap,
  sizeStyleMap
}