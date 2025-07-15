import React from "react";
import { supabase } from "../../../config/supabaseConfig";

const GoogleLoginButton: React.FC = () => {
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center gap-2 border border-gray-300 px-9 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-4"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google G"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
