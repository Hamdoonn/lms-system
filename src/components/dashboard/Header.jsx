import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = ({ title, subtitle, actionLabel, actionPath }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);
  return (
    <>
      <div className="space-y-6 p-5 rounded-xl bg-[#4c0082]  ">
        <div className="flex flex-col justify-center gap-2">
          <span className=" text-white font-medium">Welcome back</span>
          <h1 className="text-5xl font-bold capitalize text-white">
            {user.name} <span className="text-3xl">👋</span>
          </h1>
          <p className="text-zinc-300 font-medium">
            {user?.role === "instructor"
              ? "Manage your courses, track progress and guide your students."
              : "Continue your learning journey and achieve your goals."}
          </p>
        </div>

        <div>
          {/* Action Button */}
          {actionLabel && actionPath && (
            <div>
              <Link to={actionPath}>
                <Button className="cursor-pointer group relative flex items-center gap-2 bg-white text-[#4b0082] hover:bg-[#f5f5f5] transition-all">
                  <span>{actionLabel}</span>
                  <ArrowRight
                    size={18}
                    color="#4b0082"
                    className="relative -ml-6 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100"
                  />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
