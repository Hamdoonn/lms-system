import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = new URLSearchParams(location.search).get("courseId");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/courses/${courseId}`
        );
        setCourse(res.data);
      } catch (error) {
        toast.error("Failed to load course details", error.message);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/enrollments",
        { courseId, ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201 || res.data.success) {
        toast.success("Enrolled successfully!");
        navigate("/student/courses/enrolled");
      } else {
        toast.error(res.data.message || "Failed to enroll");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (!course)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <Toaster position="top-center" richColors />

      <h1 className="text-3xl font-semibold mb-8 text-center md:text-left">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT SIDE - FORM */}
        <Card className="md:col-span-2 ">
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>
              Please fill in your details to complete enrollment.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleCheckout} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your city or address"
                  required
                />
              </div>

              <div className="pt-4 border-t flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#4b0082] hover:bg-[#4b0082cc]"
                >
                  {loading ? "Processing..." : "Checkout & Enroll"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT SIDE - COURSE SUMMARY */}
        <Card className=" h-fit">
          <CardHeader>
            <CardTitle>Course Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img
                src={course.image}
                alt={course.title}
                className="rounded-lg w-full h-40 object-cover"
              />

              <div>
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-gray-500 text-sm">by {course.instructor}</p>
              </div>

              <div className="flex justify-between text-sm">
                <span>Category:</span>
                <span className="font-medium">{course.category}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Level:</span>
                <span className="font-medium">{course.level}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Duration:</span>
                <span className="font-medium">{course.duration}</span>
              </div>

              <div className="flex justify-between text-sm pt-2 border-t">
                <span>Total:</span>
                <span className="text-lg font-semibold text-[#4b0082]">
                  ${course.price || "Free"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
