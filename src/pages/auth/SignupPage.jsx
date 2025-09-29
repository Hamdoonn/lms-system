import SignupForm from "@/components/froms/SignupForm";
import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-white to-blue-50 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Learning Platform
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Create your account and start exploring courses, tracking
              progress, and achieving your learning goals.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-8 md:mt-10">
            <img
              src="https://flagcdn.com/w20/us.png"
              alt="flag"
              className="h-5 w-5 rounded-full"
            />
            <span className="text-sm md:text-base">English</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Create Your Account
          </h2>
          <SignupForm />

          <p className="text-center text-xs md:text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/auth/Login" className="text-[#4B0082] font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
