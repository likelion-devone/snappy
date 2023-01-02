import styled from "styled-components";
import PropTypes from "prop-types";

import SmallProfile from "component/common/SmallProfile/index";
import FollowButton from "../FollowButton/index";

import routeResolver from "util/routeResolver";

import ROUTE from "constant/route";
import { PROFILE_SIZE } from "constant/size";
import { LoaderNappy } from "component/common/Animation/index";

const StyledFollowerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 14px;
`;

export default function FollowerList({ data, $isLoading }) {
  return $isLoading || !data ? (
    <LoaderNappy />
  ) : (
    <StyledFollowerList>
      {data.map((follower) => {
        return (
          <li key={follower._id}>
            <SmallProfile
              size={PROFILE_SIZE.MEDIUM}
              src={follower.image}
              imageTo={routeResolver(ROUTE.PROFILE, follower.accountname)}
            >
              <SmallProfile.Side
                left={
                  <SmallProfile.Side.Title
                    title={follower.username}
                    subtitle={follower.intro}
                    gap={6}
                    titleTo={routeResolver(ROUTE.PROFILE, follower.accountname)}
                  />
                }
                right={
                  <FollowButton
                    initialIsFollowing={follower.isfollow}
                    accountname={follower.accountname}
                  />
                }
              />
            </SmallProfile>
          </li>
        );
      })}
    </StyledFollowerList>
  );
}

FollowerList.propTypes = {
  data: PropTypes.array,
  $isLoading: PropTypes.bool
}