import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import RoleBasedRedirect from "./components/auth/RoleBasedRedirect";

// Public Components
import Login from "./components/auth/LoginForm";
import ResetPassword from "./components/auth/ResetPassword";

// Routes
import PublicRoutes from "./routes/PublicRoutes";
import StudentRoutes from "./routes/StudentRoutes";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/*" element={<PublicRoutes />} />

            {/* Student Routes */}
            <Route path="/student/*" element={<StudentRoutes />} />

            {/* Utility Routes */}
            <Route path="/redirect" element={<RoleBasedRedirect />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
