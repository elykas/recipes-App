import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmailSentPage from "./pages/EmailSentPage";
import VerifyTokenPage from "./pages/verifyTokenPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/sentEmail" element={<EmailSentPage/>}></Route>
        <Route path="/verifyToken" element={<VerifyTokenPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
