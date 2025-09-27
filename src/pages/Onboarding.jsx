import { useRole } from "@/context/RoleContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconSchool, IconUserShield, IconUser } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const handleSelectedRole = (role) => {
    setRole(role);
    navigate("/auth/Login");
  };
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="mx-auto max-w-[1400px] ">
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
        <div className=" grid sm:grid-cols-1 md:grid-cols-3 items-stretch py-12 gap-x-6">
          {/* card-1 */}
          <div className="border border-gray-200 rounded-xl p-5 min-h-[300px] transistion ease-in-out duration-300 hover:shadow-xl">
            {/* card-header */}
            <div className="flex flex-col justify-start gap-3">
              <div className="w-fit h-auto bg-[#4c00821e] px-2 py-2 rounded-full">
                <IconSchool
                  stroke={2}
                  width={30}
                  height={30}
                  className="text-[#4B0082]"
                />
              </div>
              <h2 className="text-3xl font-medium">Student</h2>
            </div>
            <div>
              <p className="text-gray-500 w-full pt-2">
                Unlock your learning journey with access to diverse courses
                across categories like Web Development, UI/UX Design, and more.
                Enroll, track your progress, submit assignments, and monitor
                your grades, all from one dashboard designed to keep you
                focused.
              </p>
            </div>
            {/* button */}
            <div className="w-full pt-6 ">
              <Button
                onClick={() => handleSelectedRole("student")}
                className="w-full bg-[#4B0082] transistion ease-in-out duration-400 hover:bg-[#4c0082c7] cursor-pointer "
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* card-2 */}
          <div className="border border-gray-200 rounded-xl p-5 min-h-[300px] transistion ease-in-out duration-300 hover:shadow-xl">
            {/* card-header */}
            <div className="flex flex-col justify-start gap-3">
              <div className="w-fit h-auto bg-[#4c00821e] px-2 py-2 rounded-full">
                <IconUser
                  stroke={2}
                  width={30}
                  height={30}
                  className="text-[#4B0082]"
                />
              </div>
              <h2 className="text-3xl font-medium">Instructor</h2>
            </div>
            <div>
              <p className="text-gray-500 w-full pt-2">
                Share your knowledge by creating and managing courses with ease.
                Upload resources, assign projects, grade submissions, and track
                student engagement. Our tools are built to help you deliver
                impactful smooth teaching experiences
              </p>
            </div>
            {/* button */}
            <div className="w-full pt-6 ">
              <Button
                onClick={() => handleSelectedRole("instructor")}
                className="w-full bg-[#4B0082] transistion ease-in-out duration-400 hover:bg-[#4c0082c7] cursor-pointer "
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* card-3*/}
          <div className="border border-gray-200 rounded-xl p-5 min-h-[300px] transistion ease-in-out duration-300 hover:shadow-xl">
            {/* card-header */}
            <div className="flex flex-col justify-start gap-3">
              <div className="w-fit h-auto bg-[#4c00821e] px-2 py-2 rounded-full">
                <IconUserShield
                  stroke={2}
                  width={30}
                  height={30}
                  className="text-[#4B0082]"
                />
              </div>
              <h2 className="text-3xl font-medium">Admin</h2>
            </div>
            <div>
              <p className="text-gray-500 w-full pt-2">
                Take control of the entire platform. Manage users, approve or
                edit courses, generate system-wide reports, and configure
                platform settings. Ensure smooth operations while keeping
                learning accessible and effective for everyone.
              </p>
            </div>
            {/* button */}
            <div className="w-full pt-6 ">
              <Button
                onClick={() => handleSelectedRole("admin")}
                className="w-full bg-[#4B0082] transistion ease-in-out duration-400 hover:bg-[#4c0082c7] cursor-pointer "
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
