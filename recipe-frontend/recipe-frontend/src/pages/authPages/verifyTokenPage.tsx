// /pages/VerifyPage.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

const VerifyTokenPage = () => {
  const { verifyToken, isLoading} = useAuthContext();
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
      const { exist } = response;
      if (exist) {
        navigate("/dashboard");
      } else {
        navigate("/complete-register");
      }
    };
    callVerifyToken();
  }, [params]);
 
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </>
  );
};

export default VerifyTokenPage;
