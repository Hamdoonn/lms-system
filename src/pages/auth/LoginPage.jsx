import LoginForm from "@/components/froms/LoginForm";
import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-24">
      <section className="w-4/5 max-w-5xl">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Login To Your Account</h1>
          <p className="text-neutral-500">
            Don't have an account?{""}
            <Link to="/auth/Signup" className="underline underline-offset-4">
              SignUp
            </Link>
          </p>
        </div>
        <LoginForm />
      </section>
    </div>
  );
};

export default LoginPage;
