import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";

function ProtectedUserTypeRoute({ type, children }) {
  const auth = useAuthUser();

  const user = auth()?.user;
  if(!user) return <Navigate to="/login" />;
  if(user.type !== type) return <Navigate to="/" />;

  return children;
}

export default ProtectedUserTypeRoute;
