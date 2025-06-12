import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLogin/GoogleLogin";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useAuthContext } from "../../context/authContext";

const LoginPage = () => {
  const { emailSent, login, isLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (emailSent) {
      navigate("/sent-email");
    }
  },[emailSent]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    try {
      await login(email);
      setError("");
      setEmail("");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className=" rounded-xl p-8 shadow-[0_0_px_rgba(0,3,0,0.2)] w-full max-w-md text-center border border-gray-200">
      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="mt-6 w-full max-w-sm">
        <GoogleLoginButton />
      </div>
      <p className="text-center m-5">Or login with:</p>
      <LoginForm
        email={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        onSubmit={handleLogin}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default LoginPage;
