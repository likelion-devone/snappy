import ROUTE, { ROUTE_LOGIN } from "constant/route";
import { Navigate, useParams } from "react-router-dom";
import routeResolver from "util/routeResolver";
import JoinPageOne from "./1";
import JoinPageTwo from "./2";


export default function JoinPageByPagenum() {
  const { pagenum } = useParams();

  if (["1", "2"].includes(pagenum)) {
    return (
      <>
        {pagenum === "1" && <JoinPageOne />}
        {pagenum === "2" && <JoinPageTwo />}
      </>
    )
  }

  return <Navigate to={routeResolver(ROUTE.LOGIN, ROUTE_LOGIN.JOIN, "1")} />;
}