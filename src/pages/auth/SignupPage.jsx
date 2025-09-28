import SignupForm from "@/components/froms/SignupForm";
import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-24">
      <section className="w-4/5 max-w-5xl">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Register Your Account</h1>
          <p className="text-neutral-500">
            Already have an account?{" "}
            <Link to="/auth/Login" className="underline underline-offset-4">
              Login
            </Link>
          </p>
        </div>
        <SignupForm />
      </section>
    </div>
  );
};

export default SignupPage;
