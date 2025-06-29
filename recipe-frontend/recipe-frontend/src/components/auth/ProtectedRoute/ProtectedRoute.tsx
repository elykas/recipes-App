import { Navigate} from "react-router-dom";
import { useUserContext } from "../../../context/userContext";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: React.ReactElement;
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {user, isLoading, getUser} = useUserContext();
  const [checked, setChecked] = useState<boolean>(false)
  useEffect(() => {
    const fetchUser =  async () => {
      if (!user) {
        await getUser()
      }
      setChecked(true)
    };
    fetchUser();
  },[]);
  if (isLoading && !checked) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
