import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useAPI from "hook/useAPI";

import Button from "component/common/Button/index";
import SmallProfile from "component/common/SmallProfile/index";

import { BUTTON_STATE } from "constant/button_state";
import { BUTTON_SIZE, PROFILE_SIZE } from "constant/size";
import ROUTE from "constant/route";

import routeResolver from "util/routeResolver";
import { req } from "lib/api/index";

const FollowerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 14px;
`;

export default function FollowingListPage() {
  const { accountname } = useParams();

  const [isFollowingLoading, followingData, _followingError, getFollowingData] =
    useAPI(req.profile.following);

  const [_isUnfollowLoading, _unfollowResponse, _unfollowError, unfollow] =
    useAPI(req.profile.unfollow);

  const [_isFollowLoading, _followResponse, _followError, follow] = useAPI(
    req.profile.follow
  );

  useEffect(() => {
    getFollowingData({ accountname });
  }, [accountname, getFollowingData]);

  async function handleFollowButton(isFollow, targetAccountname) {
    if (isFollow) {
      await unfollow({ accountname: targetAccountname });
    } else {
      await follow({ accountname: targetAccountname });
    }
    getFollowingData({ accountname }), 5000;
    return;
  }

  return isFollowingLoading || !followingData ? (
    "로딩중"
  ) : (
    <FollowerList>
      {followingData.map((following) => {
        return (
          <li key={following._id}>
            <SmallProfile
              size={PROFILE_SIZE.MEDIUM}
              src={following.image}
              imageTo={routeResolver(ROUTE.PROFILE, following.accountname)}
            >
              <SmallProfile.Side
                left={
                  <SmallProfile.Side.Title
                    title={following.username}
                    subtitle={following.intro}
                    gap={6}
                    titleTo={routeResolver(
                      ROUTE.PROFILE,
                      following.accountname
                    )}
                  />
                }
                right={
                  <Button
                    size={BUTTON_SIZE.X_SMALL}
                    state={
                      following.isfollow
                        ? BUTTON_STATE.X_SMALL.ACTIVATED
                        : BUTTON_STATE.X_SMALL.ABLED
                    }
                    onClick={() => {
                      handleFollowButton(
                        following.isfollow,
                        following.accountname
                      );
                    }}
                  >
                    {following.isfollow ? "취소" : "팔로우"}
                  </Button>
                }
              />
            </SmallProfile>
          </li>
        );
      })}
    </FollowerList>
  );
}
