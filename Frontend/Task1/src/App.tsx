import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import User from "./Pages/User";
import Unauthorized from "./Pages/Unauthorized";
import ProtectedRoute from "./components/Protectedroutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={
          <ProtectedRoute role="Admin">
            <Admin />
          </ProtectedRoute>
          } />

        <Route path="/user" element={
          <ProtectedRoute role="User">
            <User />
          </ProtectedRoute>
          } />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
