import { Navigate } from "react-router-dom";
import { getUserFromLS } from "../services/google";

export default function Protected(props: any) {
  const user = getUserFromLS();
  if (user) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}
