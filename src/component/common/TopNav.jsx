import styled from "styled-components";

import { TOP_NAVBAR_HEIGHT } from "constant/style";

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;

  height: ${TOP_NAVBAR_HEIGHT};

  background-color: darkgrey; /* TODO: 상단 Nav 개발시 제거 */

  z-index: 100;
`

export default function TopNav() {
  return (
    <Wrapper>상단 Nav</Wrapper>
  )
}
