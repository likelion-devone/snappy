import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Button from "component/common/Button";

import useAPI from "hook/useAPI";
import { req } from "lib/api/index";

import { BUTTON_STATE } from "constant/button_state";
import { BUTTON_SIZE } from "constant/size";

export default function FollowButton({ initialIsFollowing, accountname, $isSizeLarge34 = false }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  // Single Source Of Truth

  const [isUnfollowLoading, _unfollowResponse, unfollowError, unfollow] =
    useAPI(req.profile.unfollow);

  const [isFollowLoading, _followResponse, followError, follow] = useAPI(req.profile.follow);

  const isLoading = isUnfollowLoading || isFollowLoading;

  async function handleFollowButton() {
    let result;
    if (isFollowing) {
      result = await unfollow({ accountname });
    } else {
      result = await follow({ accountname });
    }

    const { profile: { isfollow } } = result;
    setIsFollowing(isfollow);
  }

  useEffect(() => {
    if (followError) {
      alert(followError.message);
    }
  }, [followError])

  useEffect(() => {
    if (unfollowError) {
      alert(unfollowError.message);
    }
  }, [unfollowError])

  if ($isSizeLarge34) {
    return (
      <Button
        size={BUTTON_SIZE.LARGE_34}
        state={
          isFollowing
            ? BUTTON_STATE.LARGE_34.ACTIVATED
            : BUTTON_STATE.LARGE_34.ABLED
        }
        onClick={handleFollowButton}
      >
        {isLoading ? "로딩중" : (isFollowing ? "언팔로우" : "팔로우")}
      </Button>
    )
  }

  return (
    <Button
      size={BUTTON_SIZE.X_SMALL}
      state={
        isFollowing
          ? BUTTON_STATE.X_SMALL.ACTIVATED
          : BUTTON_STATE.X_SMALL.ABLED
      }
      onClick={handleFollowButton}
    >
      {isLoading ? "로딩중" : (isFollowing ? "취소" : "팔로우")}
    </Button>
  )
}

FollowButton.propTypes = {
  initialIsFollowing: PropTypes.bool.isRequired,
  accountname: PropTypes.string.isRequired,
  $isSizeLarge34: PropTypes.bool
}