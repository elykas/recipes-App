import React from "react";
import { useNavigate } from "react-router-dom";
import AiRecipeSection from "../../components/AiRecipe/AiRecipeSection/AiRecipeSection";
import { useUserContext } from "../../context/userContext";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  return (
    <div>
      <AiRecipeSection/>
    </div>
  );
};

export default DashboardPage;
