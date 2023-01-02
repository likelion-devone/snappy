import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { FONT_SIZE } from "constant/style";

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
`;

const Count = styled.span`
  font-weight: 700;
  line-height: 23px;
  font-size: ${FONT_SIZE.X_LARGE};
`;

const StyledSpan = styled.span`
  font-weight: 400;
  line-height: 12px;
  font-size: ${FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.snGreyIcon};
`;

/**
 * @prop {string} count
 * @prop {string} linkTo 이동하고자 하는 링크
 */
function FollowerLink({ count, to }) {
  return (
    <StyledLink to={to}>
      <Count>{count}</Count>
      <StyledSpan>followers</StyledSpan>
    </StyledLink>
  );
}

/**
 * @prop {string} count
 * @prop {string} linkTo 이동하고자 하는 링크
 */
function FollowingLink({ count, to }) {
  return (
    <StyledLink to={to}>
      <Count>{count}</Count>
      <StyledSpan>followings</StyledSpan>
    </StyledLink>
  );
}

export { FollowerLink, FollowingLink };

FollowerLink.propTypes = {
  count: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

FollowingLink.propTypes = {
  count: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
