import styled from "styled-components";

import { GLOBAL_NAVBAR_HEIGHT, TOP_NAVBAR_HEIGHT } from "constant/style";

const Layout = styled.main`
  margin: calc(${TOP_NAVBAR_HEIGHT} + 10px) auto calc(${GLOBAL_NAVBAR_HEIGHT} + 10px);
  flex-grow: 1;
  width: 100%;
  padding: 0 15px;
`;

export default Layout;