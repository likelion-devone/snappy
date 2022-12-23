import styled, { css } from "styled-components";

import Icons from "asset/icon/icons";

const cssIconSize = css`
  width: 20px;
  height: 20px;
`

const cssActivatableIcon = css`
  path {
    fill: ${({ theme, $isActive }) => $isActive ? theme.snBlue : "transparent"};
    stroke: ${({ theme, $isActive }) => $isActive ? theme.snBlue : theme.snGreyIcon};
  }
`

const cssEditIcon = css`
  rect {
    fill: ${({ theme, $isActive }) => $isActive ? theme.snBlue : "transparent"};
    stroke: ${({ theme, $isActive }) => $isActive ? theme.snBlue : theme.snGreyIcon};
  }
  path {
    fill: ${({ theme, $isActive }) => $isActive ? theme.snBlue : "transparent"};
    stroke: ${({ theme, $isActive }) => $isActive ? theme.snWhite : theme.snGreyIcon};
  }
`

const Home = styled(Icons.Home)`
  ${cssIconSize}
  ${cssActivatableIcon}
  #exclude {
    fill: ${({ theme, $isActive }) => $isActive ? theme.snWhite : "transparent"};
    stroke: ${({ theme, $isActive }) => $isActive ? theme.snWhite : theme.snGreyIcon};
    stroke-width: ${({ $isActive }) => $isActive ? "1px" : "2px"};
  }
`
const MessageCircle = styled(Icons.MessageCircle)`
  ${cssIconSize}
  ${cssActivatableIcon}
`
const Edit = styled(Icons.Edit)`
  ${cssIconSize}
  ${cssEditIcon}
`
const User = styled(Icons.User)`
  ${cssIconSize}
  ${cssActivatableIcon}
`

export { Home, MessageCircle, Edit, User };