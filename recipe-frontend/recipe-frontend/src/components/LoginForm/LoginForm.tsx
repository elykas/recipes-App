import type React from "react";

interface LoginFormProps {
  email: string;
  password: string;
  invalidLogin: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  invalidLogin,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) => {
  return (
   <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded- shadow-md  max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          type="text"
          value={email}
          onChange={onEmailChange}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={onPasswordChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {invalidLogin && (
        <p className="text-red-500 text-sm mb-4">
          Login not valid. Try again.
        </p>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
