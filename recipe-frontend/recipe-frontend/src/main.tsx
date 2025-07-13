import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { GeneratedRecipesProvider } from "./context/aiContext.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { CategoriesProvider } from "./context/categoriesContext.tsx";
import { RecipesProvider } from "./context/recipesContext.tsx";
import { UserProvider } from "./context/userContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoriesProvider>
          <UserProvider>
            <RecipesProvider>
              <GeneratedRecipesProvider>
                <App />
              </GeneratedRecipesProvider>
            </RecipesProvider>
          </UserProvider>
        </CategoriesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
