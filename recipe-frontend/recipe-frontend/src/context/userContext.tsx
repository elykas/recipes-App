import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import type { IUser } from "../types/userType";
import type { GetUser } from "../types/responseTypes";

const BASE_URL = `${import.meta.env.VITE_API_URL}/user`;

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: IUser | null;
  isLoading: boolean;
  getUser: () => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  isLoading: false,
  getUser: async () => {},
  updateUser: async () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-user`, {
        withCredentials: true,
      });
      const data = response.data as GetUser;
      setUser(data.user);
    } catch (error) {
      throw new Error("failed to get user data");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (user: IUser) => {
    setIsLoading(true);
    try {
      await axios.put(`${BASE_URL}/update-user`, user, {
        withCredentials: true,
      });
    } catch (error) {
      throw new Error("failed to update user data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, getUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
export { UserContext };
