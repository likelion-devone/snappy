import SmallProfile from "component/common/SmallProfile/index";
import ROUTE from "constant/route";
import { PROFILE_SIZE } from "constant/size";
import PropTypes from "prop-types";
import styled from "styled-components";
import routeResolver from "util/routeResolver";

const Wrapper = styled.li`
  margin: 17px 0;
`

export default function ResultCard({ _id, username, accountname, image }) {
  const profilePageRoute = routeResolver(ROUTE.PROFILE, _id)

  return (
    <Wrapper>
      <SmallProfile
        size={PROFILE_SIZE.MEDIUM}
        src={image}
        imageTo={profilePageRoute}
      >
        <SmallProfile.Side.Title title={username} subtitle={`@ ${accountname}`} gap={6} titleTo={profilePageRoute} />
      </SmallProfile>
    </Wrapper>
  )
}

ResultCard.propTypes = {
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  accountname: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}