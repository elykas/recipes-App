import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosRefreshToken";
import type { ICategory } from "../types/categoryType";
import type { CategoryListResponse } from "../types/responseTypes";

interface CategoriesProviderProps {
  children: React.ReactNode;
}

interface CategoriesContextProps {
  categories: ICategory[];
  getCategories: () => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextProps>({
  categories: [],
  getCategories: async () => {},
});

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategories = async () => {
    try {
      const response = await api.get("/categories", { withCredentials: true });
      const data = response.data as CategoryListResponse;
      const categories: ICategory[] = data.data; 
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, getCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
      throw new Error("useCategories must be used within a CategoriesProvider");
    }
    return context;
};
export default CategoriesContext;
