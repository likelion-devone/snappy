import PageDetails from "component/Profile/PageDetails/index";

import useAuthInfo from "hook/useAuthInfo";

function ProfilePage() {
  const { accountname } = useAuthInfo();

  return <PageDetails accountname={accountname} $isMyProfile={true} />
}

export default ProfilePage;
