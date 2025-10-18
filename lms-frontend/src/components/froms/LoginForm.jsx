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
import { useRole } from "@/context/RoleContext";
import axios from "axios";

// Validation Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { setRole } = useRole();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/login",
        values
      );

      // Save JWT token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      setRole(data.user.role);

      toast.success("Login Successful 🎉");
      //extra code for conflict checking
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      setRole(data.user.role);
      //TOAST.Success

      // Redirect based on role
      setTimeout(() => {
        if (data.user.role === "admin") {
          window.location.href = "/admin";
        } else if (data.user.role === "student") {
          window.location.href = "/student";
        } else if (data.user.role === "instructor") {
          window.location.href = "/instructor";
        }
      }, 1000);
    } catch (err) {
      toast.error("Login Failed ❌", {
        description: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };
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
