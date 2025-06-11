import React, { useEffect, useState } from "react";
import GoogleLoginButton from "../components/GoogleLogin/GoogleLogin";
import LoginForm from "../components/LoginForm/LoginForm";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {emailSent, login, isLoading} = useAuthContext();
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

useEffect(() => {
  if (emailSent) {
    navigate("/sentEmail")
  }
},[emailSent])
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email)
    setEmail("")
  };

  return (
    <div className=" rounded-xl p-8 shadow-[0_0_px_rgba(0,3,0,0.2)] w-full max-w-md text-center border border-gray-200">
      <div className="mt-6 w-full max-w-sm">
      <GoogleLoginButton />
      </div>
      <p className="text-center m-5">Or login with:</p>
      <LoginForm
        email={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
