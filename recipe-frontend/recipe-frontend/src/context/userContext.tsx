import React, { createContext, useContext, useState } from "react";
import api from "../api/axiosRefreshToken";
import type { GetUser } from "../types/responseTypes";
import type { IUser } from "../types/userType";

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: IUser | null;
  isLoading: boolean;
  isUserChecked: boolean;
  getUser: () => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  isLoading: true,
  isUserChecked: false,
  getUser: async () => {},
  updateUser: async () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserChecked, setIsUserChecked] = useState<boolean>(false);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/user/get-user`, {
        withCredentials: true,
      });
      const data = response.data as GetUser;
      setUser(data.user);
    } catch (error: any) {
      if (error?.isAuthError) {
        console.log("Session expired, redirecting to login...");
      } else {
        console.error("Error on fetching user: ", error);
      }
    } finally {
      setIsLoading(false);
      setIsUserChecked(true);
    }
  };

  const updateUser = async (user: IUser) => {
    setIsLoading(true);
    try {
      await api.put(`/user`, user, {
        withCredentials: true,
      });
    } catch (error) {
      throw new Error("failed to update user data");
    } finally {
      setIsLoading(false);
      setIsUserChecked(true);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isLoading, getUser, updateUser, isUserChecked }}
    >
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
