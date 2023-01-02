import { Navigate, useParams } from "react-router-dom";
import PageDetails from "component/Profile/PageDetails/index";
import useAuthInfo from "hook/useAuthInfo";
import ROUTE from "constant/route";

function YourProfilePage() {
  const { accountname } = useParams();
  const { accountname: myAccountName } = useAuthInfo();

  if (accountname === myAccountName) {
    return <Navigate to={ROUTE.PROFILE} />
  }

  return <PageDetails accountname={accountname} />
}

export default YourProfilePage;
