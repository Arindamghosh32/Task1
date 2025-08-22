import express from "express";
import { authenticate, roleCheck } from "./../middleware/Authmiddleware";

const router = express.Router();


router.get("/data", authenticate, roleCheck("Admin"), (req, res) => {
  res.json({ secret: "Admin stuff only!" });
});


router.get("/user", authenticate, roleCheck("User"), (req, res) => {
  res.json({ secret: "User stuff only!" });
});

export default router;
