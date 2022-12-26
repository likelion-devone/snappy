import { FONT_SIZE } from "constant/style";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 6px;

  text-align: center;
`;

const Count = styled.span`
  font-weight: 700;
  font-size: ${FONT_SIZE.X_LARGE};
  line-height: 23px;
`;

const StyledSpan = styled.span`
  font-weight: 400;
  font-size: ${FONT_SIZE.SMALL};
  line-height: 12px;
  color: ${({ theme }) => theme.snGreyIcon};
`;

/**
 * @prop {string} count
 * @prop {string} linkTo 가고자하는 링크
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
 * @prop {string} linkTo 가고자하는 링크
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
