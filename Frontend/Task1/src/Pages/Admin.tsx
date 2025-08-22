import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      await fetch("http://localhost:5000/logout", {
        method: "GET", 
        credentials: "include",
      });

      
      localStorage.removeItem("token");
      localStorage.removeItem("role");

     
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h4' gutterBottom>
        Welcome, Admin
      </Typography>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Admin;
