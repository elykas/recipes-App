import React, { useState } from "react";
import GoogleLoginButton from "../components/GoogleLogin/GoogleLogin";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.error("cannot login");
    } finally {
      setEmail("");
    }
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
