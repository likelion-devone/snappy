import { useParams } from "react-router-dom";

import FollowerList from "component/Profile/FollowerList/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import useTopNavSetter from "hook/useTopNavSetter";
import useFetch from "hook/useFetch";

import { req } from "lib/api/index";

export default function FollowingListPage() {
  const { accountname } = useParams();

  useTopNavSetter({
    left: (
      <>
        <TopNavElement.GoBackButton />
        <TopNavElement.Title>
          Followers
        </TopNavElement.Title>
      </>
    ),
    right: <></>
  })

  const [isFollowingLoading, followingData, _followingError] =
    useFetch(req.profile.following, { accountname });

  return <FollowerList $isLoading={isFollowingLoading} data={followingData} />
}
