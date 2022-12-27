import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FONT_SIZE } from "constant/style";
import { NavLinkMap } from "./constant";

const StyledLink = styled(Link)`
  text-align: center;
`

const Title = styled.strong`
  display: block;
  margin-top: 4px;
  
  font-weight: 400;
  font-size: ${FONT_SIZE.SMALL};
  line-height: 14px;

  color: ${({ theme, $isActive }) => $isActive ? theme.snBlue : theme.snGreyIcon};
`

function NavLink({ linkKey }) {
  const location = useLocation();
  const { to, icon: Icon, text } = NavLinkMap[linkKey];
  const isActive = location.pathname === to;

  return (
    <StyledLink to={to}>
      <Icon title={text} $isActive={isActive} />
      <Title $isActive={isActive}>{text}</Title>
    </StyledLink>
  )
}

NavLink.propTypes = {
  linkKey: PropTypes.oneOf(Object.keys(NavLinkMap)).isRequired,
}

export default NavLink;