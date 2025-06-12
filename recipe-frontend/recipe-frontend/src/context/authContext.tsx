import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type {
  LoginResponse,
  RegisterResponse,
  VerifyTokenResponse,
} from "../types/responseTypes";
import type { IUser } from "../types/userModel";


const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: IUser | null;
  userEmail : string | null
  isLoading: boolean;
  emailSent: boolean;
  verifyToken: (token: string) => Promise<{ exist: boolean;}>;
  login: (email: string) => Promise<void>;
  completeRegistration: (username: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  userEmail: null,
  isLoading: false,
  emailSent: false,
  verifyToken: async () => ({ exist: false}),
  login: async () => {},
  completeRegistration: async () => {}
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email });
      const data = response.data as LoginResponse;
      if (data.success) {
        setEmailSent(true);
        setUserEmail(email)
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyToken = async (token: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/verify-token`, { token });
      console.log("lllllllllll")
      const responseData = response.data as VerifyTokenResponse;
      const { data, exist } = responseData;
      if (exist) {
      setUser(data); 
    } else {
      setUserEmail(data.email); 
    }
    return {exist};
    } catch {
      throw new Error("failed to verify your email");
    }finally{
      setIsLoading(false)
    }
  };


  const completeRegistration = async(username: string, email: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/complete-registration`, 
        {username, email});
      const {data} = response.data as RegisterResponse
      if (data) {
        setUser(data)
      }
    } catch (error) {
        throw new Error("failed to verify your email")
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, userEmail, isLoading, emailSent, verifyToken, login, completeRegistration }}
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
