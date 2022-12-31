import { useParams } from "react-router-dom";

import FollowerList from "component/Profile/FollowerList/index";

import useFetch from "hook/useFetch";

import { req } from "lib/api/index";

export default function FollowerListPage() {
  const { accountname } = useParams();

  const [isFollowerLoading, followerData, _followerError] =
    useFetch(req.profile.follower, { accountname });

  return <FollowerList $isLoading={isFollowerLoading} data={followerData} />
}