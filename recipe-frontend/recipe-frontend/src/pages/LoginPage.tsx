import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLogin/GoogleLogin";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.error("cannot login");
      setInvalidLogin(true);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
  <div className=" rounded-xl shadow-[0_0_px_rgba(0,0,0,0.2)] w-full max-w-md text-center border border-gray-200">
      <LoginForm
        email={email}
        password={password}
        invalidLogin={invalidLogin}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
      />

      <div className="mt-6 w-full max-w-sm">
        <p className="text-center text-gray-500">Or login with:</p>
        <GoogleLoginButton />

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
