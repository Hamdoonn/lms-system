import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import Onboarding from "@/pages/Onboarding";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />

        {/* auth */}
        <Route path="/auth/Login" element={<LoginPage />} />
        <Route path="/auth/Signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
