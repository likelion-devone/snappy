import { useParams } from "react-router-dom";
import PageDetails from "component/Profile/PageDetails/index";

function YourProfilePage() {
  const { accountname } = useParams();

  return <PageDetails accountname={accountname} />
}

export default YourProfilePage;
