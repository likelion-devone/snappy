import useAuthInfo from "hook/useAuthInfo";
import PageDetails from "component/Profile/PageDetails/index";

function ProfilePage() {
  const { accountname } = useAuthInfo();

  return <PageDetails accountname={accountname} $isMyProfile={true} />
}

export default ProfilePage;
