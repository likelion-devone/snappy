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

function FollowerCounter({ count }) {
  return (
    <StyledLink to="/:accountname/follower">
      <Count>{count}</Count>
      <StyledSpan>followers</StyledSpan>
    </StyledLink>
  );
}

/**
 * @prop {string} count
 */
function FollowingCounter({ count }) {
  return (
    <StyledLink to="/:accountname/following">
      <Count>{count}</Count>
      <StyledSpan>followings</StyledSpan>
    </StyledLink>
  );
}

export { FollowerCounter, FollowingCounter };

FollowerCounter.propTypes = {
  count: PropTypes.string.isRequired,
};

FollowingCounter.propTypes = {
  count: PropTypes.string.isRequired,
};
