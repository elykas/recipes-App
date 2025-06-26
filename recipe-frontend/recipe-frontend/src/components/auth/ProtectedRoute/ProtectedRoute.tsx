import { Navigate} from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { useUserContext } from "../../../context/userContext";

interface ProtectedRouteProps {
    children: React.ReactElement;
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoading } = useAuthContext();
  const {user} = useUserContext();

  if (isLoading) return <p>Loading</p>;

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
