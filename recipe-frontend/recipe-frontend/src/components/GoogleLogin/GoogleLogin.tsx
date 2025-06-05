import React  from "react";


const GoogleLoginButton:React.FC = () => {
  const handleGoogleLogin = () => {
    window.open("http://localhost:3000/api/auth/google", "_self"); 
  };

  return (
     <button
      onClick={handleGoogleLogin}
      className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;