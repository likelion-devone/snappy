import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SmallProfile from "component/common/SmallProfile/index";

import routeResolver from "util/routeResolver";

import ROUTE from "constant/route";
import { PROFILE_SIZE } from "constant/size";

const Wrapper = styled.li`
  position: relative;
  margin: 17px 0;
`

const StyledLink = styled(Link)`
  position: absolute;
  inset: 0;
  color: transparent;
`

export default function ResultCard({ username, accountname, image }) {
  const profilePageRoute = routeResolver(ROUTE.PROFILE, accountname)

  return (
    <Wrapper>
      <SmallProfile
        size={PROFILE_SIZE.MEDIUM}
        src={image}
      >
        <SmallProfile.Side.Title title={username} subtitle={`@ ${accountname}`} gap={6} />
      </SmallProfile>
      <StyledLink to={profilePageRoute}>
        {username}님의 프로필로 이동하기
      </StyledLink>
    </Wrapper>
  )
}

ResultCard.propTypes = {
  username: PropTypes.string.isRequired,
  accountname: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}