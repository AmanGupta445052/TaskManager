import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { Route, Routes, useLocation } from "react-router-dom";
import backgroundImage from "./components/Common/background.webp"
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { ToastProvider } from "./components/Common/Toast";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Common/Navbar";
import { Dashboard } from "./pages/Dashboard";

function AppContent() {
  const location = useLocation();

  // Hide navbar on auth pages
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ToastProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </ToastProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
