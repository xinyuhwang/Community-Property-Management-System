import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import ResidentPage from "./pages/ResidentPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.role === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/resident" />
                )
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/resident"
            element={
              user ? (
                user.role === "resident" ? (
                  <ResidentPage user={user} />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin"
            element={
              user ? (
                user.role === "admin" ? (
                  <AdminPage user={user} />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
