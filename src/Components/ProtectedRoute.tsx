// Components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user || !user.jwt) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
