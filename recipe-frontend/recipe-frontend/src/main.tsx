import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/authContext.tsx";
import { UserProvider } from "./context/userContext.tsx";
import { RecipesProvider } from "./context/recipesContext.tsx";
import { GeneratedRecipesProvider } from "./context/aiContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <RecipesProvider>
            <GeneratedRecipesProvider>
              <App />
            </GeneratedRecipesProvider>
          </RecipesProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
