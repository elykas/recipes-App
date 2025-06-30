import { Navigate} from "react-router-dom";
import { useUserContext } from "../../../context/userContext";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactElement;
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {user, isLoading, getUser, isUserChecked} = useUserContext();
  useEffect(() => {
    const fetchUser =  async () => {
      if (!user) {
        await getUser()
      }
    };
    fetchUser();
  },[]);
  if (isLoading || !isUserChecked ) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
