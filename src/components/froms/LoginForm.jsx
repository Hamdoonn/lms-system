import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be 8 characters"),
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

  function onSubmit(values) {
    setLoading(true); // start spinner

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // check if user exists with given credentials
      const validUser = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (validUser) {
        //store logged in user
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        toast.success("Login Successful 🎉", {
          description: `Welcome back, ${validUser.name}`,
        });

        if (validUser.role === "student") {
          window.location.href = "/student/student-dashboard";
        } else if (validUser.role === "instructor") {
          window.location.href = "/instructore/instructor-dashboard";
        } else if (validUser.role === "admin") {
          window.location.href = "/admin/admin-dashboard";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        toast.error("Login Failed ❌", {
          description: "Invalid email or password.",
        });
      }

      setLoading(false); // stop spinner
    }, 2000); // delay of 2 seconds
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto"
      >
        <button onClick={() => toast.success("Hello World!")}>
          Show Toast
        </button>

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

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={loading}>
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
