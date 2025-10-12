import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user-controller.js";
import { authorize, protect } from "../../middleware/auth-middleware.js";
import { allowSelForAdmin } from "../../middleware/role-middleware.js";

const router = Router();

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Test Routes for Role Check
// Any logged-in user can check their role
router.get("/my-role", protect, (req, res) => {
  res.json({
    message: "Logged in user role",
    user: {
      id: req.user.id,
      role: req.user.role,
    },
  });
});

// Quick test routes for each role
router.get("/student-area", protect, authorize("student"), (req, res) => {
  res.json({ message: "Welcome Student!", role: req.user.role });
});

router.get("/instructor-area", protect, authorize("instructor"), (req, res) => {
  res.json({ message: "Welcome Instructor!", role: req.user.role });
});

router.get("/admin-area", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!", role: req.user.role });
});

//admin only routes
router.get("/", protect, authorize("admin"), getAllUsers);
router.delete("/:id", protect, authorize("admin"), deleteUser);

// User-specific routes (admin or self)
router.get("/:id", protect, allowSelForAdmin, getUserById);
router.put("/:id", protect, allowSelForAdmin, updateUser);

export default router;
