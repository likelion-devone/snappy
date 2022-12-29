import { css } from "styled-components";

const cssNavbar = css`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.snWhite};
`;

export { cssNavbar };
