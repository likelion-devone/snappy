import { css } from "styled-components";

import { MAX_WIDTH, MIN_WIDTH } from "constant/style";

const cssLayout = css`
  margin: 0 auto;

  width: min(${MAX_WIDTH}, 100%);
  min-width: ${MIN_WIDTH};
  min-height: 100vh;

  background-color: ${({ theme }) => theme.snWhite};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export { cssLayout }