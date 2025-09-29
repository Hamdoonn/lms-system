import { useRole } from "@/context/RoleContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IconSchool,
  IconUserShield,
  IconUser,
  IconCheck,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const handleSelectedRole = (role) => {
    setRole(role);
    navigate("/auth/Login");
  };

  const roles = [
    {
      title: "Student",
      icon: (
        <IconSchool
          stroke={2}
          width={30}
          height={30}
          className="text-[#4B0082]"
        />
      ),
      features: [
        "Access courses like Web Development, UI/UX, and more",
        "Track progress and monitor grades",
        "Submit assignments seamlessly",
        "Stay focused with a student dashboard",
      ],
      roleKey: "student",
    },
    {
      title: "Instructor",
      icon: (
        <IconUser
          stroke={2}
          width={30}
          height={30}
          className="text-[#4B0082]"
        />
      ),
      features: [
        "Create and manage courses with ease",
        "Upload resources and assign projects",
        "Grade submissions efficiently",
        "Track student engagement",
      ],
      roleKey: "instructor",
    },
    {
      title: "Admin",
      icon: (
        <IconUserShield
          stroke={2}
          width={30}
          height={30}
          className="text-[#4B0082]"
        />
      ),
      features: [
        "Manage users and approve/edit courses",
        "Generate system-wide reports",
        "Configure platform settings",
        "Ensure smooth learning operations",
      ],
      roleKey: "admin",
    },
  ];

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="mx-auto max-w-[1400px]">
        {/* header */}
        <div className="flex flex-col justify-start w-full gap-2">
          <h1 className="font-semibold text-7xl">Learnix</h1>
          <p className="font-regular text-gray-500 w-full max-w-[600px]">
            Our LMS is a modern, dashboard-based learning platform designed for
            students, instructors, and admins. It covers everything from course
            browsing and enrollments to assignments, grades, and reporting — all
            in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 items-stretch py-12 gap-6">
          {roles.map(({ title, icon, features, roleKey }) => (
            <div
              key={title}
              className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* card-header */}
              <div className="flex flex-col gap-3">
                <div className="w-fit bg-[#4c00821e] p-3 rounded-full">
                  {icon}
                </div>
                <h2 className="text-2xl font-semibold">{title}</h2>
              </div>

              {/* features */}
              <ul className="pt-4 space-y-2">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <IconCheck size={18} className="text-[#4B0082] mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* button */}
              <div className="w-full pt-6">
                <Button
                  onClick={() => handleSelectedRole(roleKey)}
                  className="w-full bg-[#4B0082] hover:bg-[#4c0082c7] transition ease-in-out duration-300"
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
