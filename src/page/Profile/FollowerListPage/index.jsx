import { useParams } from "react-router-dom";

import FollowerList from "component/Profile/FollowerList/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import useTopNavSetter from "hook/useTopNavSetter";
import useFetch from "hook/useFetch";

import { req } from "lib/api/index";

export default function FollowerListPage() {
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

  const [isFollowerLoading, followerData, _followerError] =
    useFetch(req.profile.follower, { accountname });

  return <FollowerList $isLoading={isFollowerLoading} data={followerData} />
}