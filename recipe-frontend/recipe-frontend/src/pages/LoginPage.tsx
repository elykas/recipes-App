import React, { useState } from "react"
import { Link } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLogin/GoogleLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);

 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
  
    } catch (error) {
      console.error("cannot login");
      setInvalidLogin(true);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login-form">
        <h2>Login</h2>
      <form  onSubmit={handleLogin}>
        <div className="input-box">
          <label>Username :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" />
      </form>
      <p style={{ color: "red" }}>
        {invalidLogin && "login not valid try again"}
      </p>
       <p>Or login with:</p>
      <GoogleLoginButton />

      <p className="go-register">
        Don't have an account
        {
          <Link to={"/register"}>
            <button className="button-register"> Register</button>
          </Link>
        }
      </p>
    </div>
  );
};

export default Login;
