import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import { Activity, ChartColumn } from "lucide-react";
import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <Header />

      {/* Stats Section */}
      <div>
        <StatsCard />
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* ===== Platform Overview Card ===== */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm card-elevated">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-[24px] font-semibold leading-none tracking-tight flex items-center gap-2">
              <ChartColumn className="h-5 w-5 text-blue-500" />
              Platform Overview
            </h3>
          </div>

          <div className="p-6 pt-0 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium  text-[16px]">Active Students</p>
                <p className="text-[14px] text-muted-foreground">Currently Learning</p>
              </div>
              <p className="text-2xl font-bold text-primary">892</p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-[16px]">Active Instructors</p>
                <p className="text-[14px] text-muted-foreground">Teaching Courses</p>
              </div>
              <p className="text-2xl font-bold text-primary">47</p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-[16px]">Course Completion</p>
                <p className="text-[14px] text-muted-foreground">Average Rate</p>
              </div>
              <p className="text-2xl font-bold text-primary">78%</p>
            </div>
          </div>
        </div>

        {/* ===== Recent Activity Card ===== */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm card-elevated">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-[24px] font-semibold leading-none tracking-tight flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-500" />
              Recent Activity
            </h3>
          </div>

          <div className="p-6 pt-0 space-y-4">
            <div className="flex flex-col gap-4">
              {/* Notification 1 */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-[16px]">New Instructor Registered</p>
                  <p className="text-[14px] text-muted-foreground">2 minutes ago</p>
                </div>
              </div>

              {/* Notification 2 */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-[16px]">Course Published</p>
                  <p className="text-[14px] text-muted-foreground">15 minutes ago</p>
                </div>
              </div>

              {/* Notification 3 */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-[16px]">Student Completed Courses</p>
                  <p className="text-[14px] text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
