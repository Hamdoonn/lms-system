import jwt from "jsonwebtoken";
import User from "../modules/user/user-model.js";

// Middleware to protect routes (only logged-in users can access)
export const protect = async (req, res, next) => {
  let token;

  try {
    // Check for Bearer token in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token found
    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user info from database
    const user = await User.findById(decoded.id).select("name email role");

    if (!user) {
      return res.status(401).json({ message: "User not found, unauthorized" });
    }

    // Attach user object to request
    req.user = user;

    // Optional: log user info for debugging
    console.log("🧑 Authenticated User:", req.user);

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check role-based access
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied, insufficient permission" });
    }
    next();
  };
};
