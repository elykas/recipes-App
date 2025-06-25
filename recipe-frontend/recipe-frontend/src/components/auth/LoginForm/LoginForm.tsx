import type React from "react";

interface LoginFormProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  onEmailChange,
  onSubmit,
}: LoginFormProps) => {
  return (
   <form
      onSubmit={onSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          type="text"
          value={email}
          onChange={onEmailChange}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
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
