import { useState } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // send/receive cookies if using jwt in cookies
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Store token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // ✅ Navigate based on role
      if (data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextField 
              label="Email" 
              variant="outlined" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email" 
            />
            <TextField 
              label="Password" 
              variant="outlined" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />

            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value as "Admin" | "User")}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </Box>
        </form>

        <br/>
        <Box sx={{ textAlign: "center" }}>
          <Typography 
            variant="caption"
            sx={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/register")}
          >
            Not Yet Registered?
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
