export const sidebarConfig = {
  student: [
    { label: "Dashboard", icon: "home", path: "/student" },
    {
      label: "Courses",
      icon: "book",
      children: [
        {
          label: "Available Courses",
          icon: "book-open",
          path: "/student/courses/available",
        },
        {
          label: "Enrolled Courses",
          icon: "library",
          path: "/student/courses/enrolled",
        },
      ],
    },
    { label: "Assignments", icon: "file-text", path: "/student/assignments" },
    { label: "Grades", icon: "check-circle", path: "/student/grades" },
    { label: "Settings", icon: "settings", path: "/student/settings" },
  ],

  instructor: [
    { label: "Dashboard", icon: "home", path: "/instructor" },
    {
      label: "Courses",
      icon: "book",
      children: [
        {
          label: "Add Course",
          icon: "plus-circle",
          path: "/instructor/courses/add",
        },
        {
          label: "Manage Courses",
          icon: "list",
          path: "/instructor/courses/manage",
        },
      ],
    },
    {
      label: "Assignments",
      icon: "file-text",
      path: "/instructor/assignments",
    },
    { label: "Grades", icon: "check-circle", path: "/instructor/grades" },
    { label: "Students", icon: "users", path: "/instructor/students" },
    { label: "Settings", icon: "settings", path: "/instructor/settings" },
  ],

  admin: [
    { label: "Dashboard", icon: "home", path: "/admin" },
    
    { label: "Reports", icon: "bar-chart", path: "/admin/reports" },
    { label: "Users", icon: "users", path: "/admin/users" },
    { label: "Settings", icon: "settings", path: "/admin/settings" },
  ],
};
