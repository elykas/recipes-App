import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default DashboardPage;
