import { useState } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

     
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

    
      if (data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextField 
              label="Name" 
              variant="outlined" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField 
              label="Email" 
              variant="outlined" 
              placeholder="Enter Your Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

        <br />
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{
              cursor: "pointer",
              "&:hover": { color: "primary.main" }
            }}
            onClick={() => navigate("/login")}
          >
            Already Signed in?
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
