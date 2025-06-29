import { Route, Routes } from "react-router-dom";
import EmailSentPage from "./pages/authPages/EmailSentPage";
import LoginPage from "./pages/authPages/LoginPage";
import VerifyTokenPage from "./pages/authPages/verifyTokenPage";
import CompleteRegistrationPage from "./pages/authPages/CompleteRegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import DashboardPage from "./pages/recipePages/dashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/sent-email" element={<EmailSentPage />}></Route>
        <Route path="/verify-token" element={<VerifyTokenPage />}></Route>
        <Route path="/complete-register" element={<CompleteRegistrationPage/>}></Route>
        <Route path="/" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}></Route>
      </Routes>
    </>
  );
}

export default App;
