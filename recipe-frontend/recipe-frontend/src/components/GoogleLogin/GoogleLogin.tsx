import React  from "react";


const GoogleLoginButton:React.FC = () => {
  const handleGoogleLogin = () => {
    window.open("http://localhost:3000/api/auth/google", "_self"); 
  };

  return (
    <button className="google-btn" onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;