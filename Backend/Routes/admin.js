import express from "express";
import { authenticate, roleCheck } from "./../middleware/Authmiddleware";

const router = express.Router();

// Example: Only Admin can access
router.get("/data", authenticate, roleCheck("Admin"), (req, res) => {
  res.json({ secret: "Admin stuff only!" });
});

// Example: Only User can access
router.get("/user", authenticate, roleCheck("User"), (req, res) => {
  res.json({ secret: "User stuff only!" });
});

export default router;
