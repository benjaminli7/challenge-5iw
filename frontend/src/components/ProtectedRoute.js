import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const auth = useAuthUser();

  const user = auth()?.user

  if(!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
