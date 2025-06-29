import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CalendarPage from "./pages/Calendar";
import { Routes, Route, Navigate } from "react-router-dom";



const App: React.FC = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <Routes>
      {/* Home page with MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home/>
          </MainLayout>
        }
      />
      {/* Login page */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/calendar"
        element={isLoggedIn ? <CalendarPage /> : <Navigate to="/" />}
      />
      
    </Routes>
  );
};

export default App;
