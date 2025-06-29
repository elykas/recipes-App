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

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  userEmail: string | null;
  isLoading: boolean;
  verifyToken: (token: string) => Promise<boolean>;
  login: (email: string) => Promise<boolean>;
  completeRegistration: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  userEmail: null,
  isLoading: false,
  verifyToken: async () => false,
  login: async () => false,
  completeRegistration: async () => {},
  logout: async() => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email });
      const data = response.data as LoginResponse;
      console.log(data);
      if (data.success) {
        setUserEmail(email);
      }
      return data.success;
    } catch (err) {
        throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyToken = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/verify-token`, { token }
        ,{ withCredentials: true });
      const responseData = response.data as VerifyTokenResponse;
      return responseData.exist;
    } catch {
      throw new Error("failed to verify your email");
    } finally {
      setIsLoading(false);
    }
  };

  const completeRegistration = async (username: string) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/complete-register`,
        { username },
        { withCredentials: true }
      );
    } catch (error) {
      throw new Error("failed to verify your email");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async() => {
    setIsLoading(true)
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      throw new Error("failed to logout");
    }finally{
      setIsLoading(false);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        userEmail,
        isLoading,
        verifyToken,
        login,
        completeRegistration,
        logout
      }}
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
