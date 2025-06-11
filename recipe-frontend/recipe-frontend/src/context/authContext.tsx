import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import type { IUser } from "../types/userModel";

 const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;


interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user:IUser | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  login: async () => {},
});

export const AuthProvider:React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (username: string) => {
    try {
      const response = await axios.post<IUser>(`${BASE_URL}/login`, { username });
      const data:IUser = response.data
      if (data) {
        setUser(data);
      }
    } catch (error) {
      throw new Error("failed to login");
    }
  }
    return (
      <AuthContext.Provider value={{ user, isLoading, login }}>
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
export {AuthContext};
