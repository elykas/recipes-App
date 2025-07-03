import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import CompleteRegistrationPage from "./pages/authPages/CompleteRegisterPage";
import EmailSentPage from "./pages/authPages/EmailSentPage";
import LoginPage from "./pages/authPages/LoginPage";
import VerifyTokenPage from "./pages/authPages/verifyTokenPage";
import DashboardPage from "./pages/recipePages/dashboardPage";
import UsersRecipesPage from "./pages/recipePages/userRecipesPage";
import Layout from "./pages/layout/Layout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/sent-email" element={<EmailSentPage />}></Route>
        <Route path="/verify-token" element={<VerifyTokenPage />}></Route>
        <Route path="/complete-register" element={<CompleteRegistrationPage />}></Route>
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}></Route>
        <Route path="/user-recipes" element={<ProtectedRoute><UsersRecipesPage /></ProtectedRoute>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
