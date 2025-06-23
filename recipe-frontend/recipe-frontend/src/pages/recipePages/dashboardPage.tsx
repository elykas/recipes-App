import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { getUser, user} = useUserContext();

useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser();
      } catch (error) {
        console.error(error);
        navigate("/login"); 
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <p>This is your dashboard.</p>
      <p>{user?.username}</p>
    </div>
  );
};

export default DashboardPage;
