import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuthContext } from "../../context/authContext";

const EmailSentPage: React.FC = () => {
  const { userEmail, login, isLoading } = useAuthContext();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  
  const handleResendEmail = async () => {
    if (!userEmail) {
      navigate("/");
      return
    }
    try {
      await login(userEmail);
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleClose = () => {
    navigate("/")
  }
  return (
    <div className="text-center mt-10">
   <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        aria-label="Close"
      >
        <X size={24} /> 
      </button>
      <h2 className="text-2xl font-bold">Check your email</h2>
      <p className="mt-4 text-gray-600">
        We’ve sent you a login link. Click it to sign in.
      </p>
      <p className="mt-4 text-gray-600">
        Didn’t receive an email?{" "}
        <button
          onClick={handleResendEmail}
          className="text-blue-600 hover:underline font-medium"
        >
          Click here to send again
        </button>
      </p>
      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
export default EmailSentPage;
