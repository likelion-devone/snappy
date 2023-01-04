import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FONT_SIZE, MAX_WIDTH } from "constant/style";
import { NAV_LINK_MAP } from "./constant";

const StyledLink = styled(Link)`
  text-align: center;

  @media (min-width: ${MAX_WIDTH}) {
    display: flex;
    align-items: center;

    margin: 20px 20px;
  }
`

const Title = styled.strong`
  display: block;
  margin-top: 4px;
  
  font-weight: 400;
  font-size: ${FONT_SIZE.SMALL};
  line-height: 14px;

  color: ${({ theme, $isActive }) => $isActive ? theme.snBlue : theme.snGreyIcon};

  @media (min-width: ${MAX_WIDTH}) {
    font-weight: 500;
    font-size: ${FONT_SIZE.X_LARGE};
    margin-left: 10px;
  }
`

function NavLink({ linkKey }) {
  const location = useLocation();
  const { to, icon: Icon, text } = NAV_LINK_MAP[linkKey];
  const isActive = location.pathname === to;

  return (
    <StyledLink to={to}>
      <Icon title={text} $isActive={isActive} />
      <Title $isActive={isActive}>{text}</Title>
    </StyledLink>
  )
}

NavLink.propTypes = {
  linkKey: PropTypes.oneOf(Object.keys(NAV_LINK_MAP)).isRequired,
}

export default NavLink;