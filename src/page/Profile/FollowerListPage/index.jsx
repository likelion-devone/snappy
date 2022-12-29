import styled from "styled-components";
import { useParams } from "react-router-dom";
import useAPI from "hook/useAPI";
import { useEffect, useRef } from "react";
import { req } from "lib/api/index";

import Button from "component/common/Button/index";
import SmallProfile from "component/common/SmallProfile/index";

import { BUTTON_STATE } from "constant/button_state";
import { BUTTON_SIZE, PROFILE_SIZE } from "constant/size";

const FollowerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 14px;
`;

export default function FollowerListPage() {
  const { accountname } = useParams();

  const [isFollowerLoading, followerData, _followerError, getFollowerData] =
    useAPI(req.profile.follower);

  const [_isUnfollowLoading, _unfollowResponse, _unfollowError, unfollow] =
    useAPI(req.profile.unfollow);

  const [_isFollowLoading, _followResponse, _followError, follow] = useAPI(
    req.profile.follow
  );

  useEffect(() => {
    getFollowerData({ accountname });
  }, []);

  function handleFollowButton(isFollow, targetAccountname) {
    if (isFollow) {
      unfollow({ accountname: targetAccountname });
      console.log("unfollowed");
    } else {
      follow({ accountname: targetAccountname });
      console.log("followed");
    }
    getFollowerData({ accountname }), 5000;
    return;
  }

  const buttonRef = useRef();

  return isFollowerLoading || !followerData ? (
    "로딩중"
  ) : (
    <FollowerList>
      {followerData.map((follower) => {
        return (
          <li key={follower._id}>
            <SmallProfile size={PROFILE_SIZE.MEDIUM} src={follower.image}>
              <SmallProfile.Side
                left={
                  <SmallProfile.Side.Title
                    title={follower.username}
                    subtitle={follower.intro}
                    gap={6}
                  />
                }
                right={
                  <Button
                    ref={buttonRef}
                    size={BUTTON_SIZE.X_SMALL}
                    state={
                      follower.isfollow
                        ? BUTTON_STATE.X_SMALL.ACTIVATED
                        : BUTTON_STATE.X_SMALL.ABLED
                    }
                    onClick={() => {
                      handleFollowButton(
                        follower.isfollow,
                        follower.accountname
                      );
                    }}
                  >
                    {follower.isfollow ? "취소" : "팔로우"}
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
