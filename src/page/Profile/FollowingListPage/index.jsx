import { useParams } from "react-router-dom";

import useFetch from "hook/useFetch";

import { req } from "lib/api/index";
import FollowerList from "component/Profile/FollowerList/index";

export default function FollowingListPage() {
  const { accountname } = useParams();

  const [isFollowingLoading, followingData, _followingError] =
    useFetch(req.profile.following, { accountname });

  return <FollowerList $isLoading={isFollowingLoading} data={followingData} />
}
