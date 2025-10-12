export const allowSelForAdmin = (req, res, next) => {
  const loggedInUser = req.user;
  const targetUserId = req.params.id;

  //admin can do evrything
  if (loggedInUser.role === "admin") {
    return next();
  }

  //student can access onyl their data /update their own profile
  if (loggedInUser.role === "student" && loggedInUser.id === targetUserId) {
    return next();
  }

  // Instructors can access/update their own profile
  if (loggedInUser.role === "instructor" && loggedInUser.id === targetUserId) {
    return next();
  }

  return res.status(403).json({
    message: "Access denied",
  });
};
