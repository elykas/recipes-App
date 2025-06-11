import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type {
  LoginResponse,
  VerifyTokenResponse,
} from "../types/responseTypes";
import type { IUser } from "../types/userModel";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: IUser | null;
  isLoading: boolean;
  emailSent: boolean;
  verifyToken: (token: string) => Promise<void>;
  login: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  emailSent: false,
  verifyToken: async () => {},
  login: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const login = async (username: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/login`, { username });
      const data = response.data as LoginResponse;
      if (data.success) {
        setEmailSent(true);
      }
    } catch (error) {
      throw new Error("failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyToken = async (token: string) => {
    try {
      const response = await axios.post(`${BASE_URL}verify-token`, { token });
      const responseData = response.data as VerifyTokenResponse;

      const { data, exist } = responseData;

      if (exist) {
        // You can use a type guard here to safely check if it's an IUser
        setUser(data as IUser); // Assuming you're confident it's a full user
      }

      return { exist, data };
    } catch {
      throw new Error("failed to verify your email");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, emailSent, verifyToken, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
export { AuthContext };
