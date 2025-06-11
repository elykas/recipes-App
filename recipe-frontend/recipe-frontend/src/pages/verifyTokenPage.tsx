// /pages/VerifyPage.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const VerifyTokenPage = () => {
  const { verifyToken } = useAuthContext();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      navigate("/");
      return;
    }
    const callVerifyToken = async () => {
      const response = await verifyToken(token);
      

    };
    callVerifyToken;
  }, [params, navigate]);
  return null;
};

export default VerifyTokenPage;
