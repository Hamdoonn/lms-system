"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ReceiptTurkishLira } from "lucide-react";
import { toast, Toaster } from "sonner";

// Validation Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const adminCredentials = {
    email: "admin@mail.com",
    password: "admin12345",
    role: "admin",
    name: "System Admin",
  };

  //  Handle submit
  function onSubmit(values) {
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const validUser = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      //check for admin
      if (
        values.email === adminCredentials.email &&
        values.password === adminCredentials.password
      ) {
        localStorage.setItem("loggedInUser", JSON.stringify(adminCredentials));
        localStorage.setItem("role", "admin");

        toast.success("Welcome Back Admin");
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1500);
        setLoading(false);
        return true;
      }

      //other users roles
      if (validUser) {
        // store user + role
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        localStorage.setItem("role", validUser.role);

        toast.success("Login Successful 🎉");

        // Redirect user to their role's dashboard
        setTimeout(() => {
          if (validUser.role === "student") {
            window.location.href = "/student";
          } else if (validUser.role === "instructor") {
            window.location.href = "/instructor";
          }
        }, 1500);
      } else {
        toast.error("Login Failed ❌", {
          description: "Invalid email or password.",
        });
      }

      setLoading(false);
    }, 2000);
  }

  return (
    <Form {...form}>
      <Toaster position="top-center" richColors />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#4B0082] transition ease-in-out duration-300 hover:bg-[#4c0082c7]"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
