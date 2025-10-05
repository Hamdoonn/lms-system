import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  // Role-based header
  const getRoleContent = (role) => {
    switch (role) {
      case "student":
        return {
          subtitle: "Continue your learning journey and achieve your goals.",
          buttonText: "Explore Courses",
          buttonLink: "/student/courses/available",
        };
      case "instructor":
        return {
          subtitle: "Create, manage, and inspire students with your courses.",
          buttonText: "Manage Courses",
          buttonLink: "/instructor/courses",
        };
      case "admin":
        return {
          subtitle: "Monitor, manage users, and maintain the platform.",
          buttonText: "See Reports",
          buttonLink: "/admin/reports",
        };
      default:
        return {
          subtitle: "Welcome to the platform.",
          buttonText: "Get Started",
          buttonLink: "/",
        };
    }
  };

  if (!user) return null;

  const { subtitle, buttonText, buttonLink } = getRoleContent(user.role);

  return (
    <div>
  
      <div className="space-y-6 p-5 rounded-xl bg-[#4c0082]  ">
        <div className="flex flex-col justify-center gap-2">
          <span className="text-white font-medium">Welcome back</span>
          <h1 className="text-5xl font-bold capitalize text-white">
            {user.name} <span className="text-3xl">👋</span>
          </h1>
          <p className="text-zinc-300 font-medium">{subtitle}</p>
        </div>
        <div>
          <Link to={buttonLink}>
            <Button className="cursor-pointer group relative flex items-center gap-2 bg-white text-[#4b0082] hover:bg-[#f5f5f5] transition-all">
              <span>{buttonText}</span>
              <ArrowRight
                size={18}
                color="#4b0082"
                className="relative -ml-6 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100"
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
