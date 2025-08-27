import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import User from "./Pages/User";
import Unauthorized from "./Pages/Unauthorized";
import ProtectedRoute from "./components/Protectedroutes";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline /> 
      <Router>
        
        <div style={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute role="User">
                <User />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
