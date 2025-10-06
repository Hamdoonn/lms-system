import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "A bar chart"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}
import {
  FileBarChart,
  Download,
  BarChart3,
  PieChart,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";

const Reports = () => {
  return (
    <div>
      

      {/* Page Header */}
      <div className="flex items-center justify-between mt-6 mb-8">
        <div className="flex flex-col gap-2">

        
        <h2 className="text-3xl font-semibold flex items-center gap-2 ">
          Reports & Analytics
        </h2>
        <p>Gain insights into platform performance and user activity trends</p>
        </div>

        <div className="flex items-center gap-3">
          <select className="border border-border bg-card text-sm rounded-lg px-3 py-2 focus:outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>This year</option>
          </select>

          <button className="flex items-center gap-2 bg-[#4C0082] text-white px-4 py-2 rounded-lg  hover:bg-[#4C0082]/90 transition hover:shadow-lg hover:scale[1.02] hover:-translate-y-0.5 hover:shadow-purple-500/50 hover:duration-300 hover:ease-in-out hover: tracking-normal hover:translation-duration-300 hover:translation-ease-in-out">
            <Download className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Reports Content */}
      <div className="space-y-6">
        {/* Main Overview Card */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">

              
      
            
           
          </div>

          {/* Summary Stats */}
          
          <StatsCard role="admin" page="reports"/>

         {/* Analytic Chart*/}
         <div className="flex gap-5 ">

        
         <div className="flex items-center justify-center rounded-xl overflow-hidden border border-border bg-card shadow-sm h-[380px] w-full">
  <Card className="w-full h-full border-none shadow-none">
    <CardHeader className="pb-2">
      <CardTitle className="text-xl text-[#4C0082]">Performance Overview</CardTitle>
      <CardDescription>January – June 2024</CardDescription>
    </CardHeader>

    <CardContent className="px-4 pb-4">
      <ChartContainer
        config={{
          desktop: {
            label: "Performance",
            color: "#4C0082", // your purple
          },
        }}
        className="w-full h-[280px]"
      >
        <BarChart
          data={[
            { month: "January", desktop: 2200 },
            { month: "February", desktop: 1800 },
            { month: "March", desktop: 2600 },
            { month: "April", desktop: 3200 },
            { month: "May", desktop: 2800 },
            { month: "June", desktop: 3400 },
          ]}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }} // ensures bars aren’t cut
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(76, 0, 130, 0.1)" }}
            content={<ChartTooltipContent />}
          />
          <Bar
            dataKey="desktop"
            fill="#4C0082"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </CardContent>

    <CardFooter className="flex-col items-start gap-1 text-sm text-muted-foreground">
      <p>
        Overall engagement improved by{" "}
        <span className="text-green-600 font-medium">12%</span> since last quarter.
      </p>
    </CardFooter>
  </Card>
</div>

 <div className="flex flex-col justify-between bg-card rounded-xl p-6 shadow-sm border border-border w-1/3 "> 

  <h3 className="text-lg font-semibold text-[#4C0082] mb-4">Quick Insights</h3>
  <div className="space-y-4 text-sm flex flex-col justify-center h-full">
    <div className="flex justify-between">
      <span>Total Courses</span>
      <span className="font-medium text-[#4C0082]">154</span>
    </div>
    <div className="flex justify-between">
      <span>Active Instructors</span>
      <span className="font-medium text-[#4C0082]">7</span>
    </div>
    <div className="flex justify-between">
      <span>Active Students</span>
      <span className="font-medium text-[#4C0082]">4231</span>
    </div>
    <div className="flex justify-between">
      <span>Feedbacks Received</span>
      <span className="font-medium text-[#4C0082]">291</span>
    </div>
  </div>
 

</div> 

</div>



  

        </div>

        {/* Secondary Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Report Card 1 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-[18px] font-semibold flex items-center gap-2 mb-3 text-[#4C0082]">
              <Users className="h-5 w-5 text-[#4C0082]" />
              Top Performing Instructors
            </h3>
            <ul className="space-y-2 text-[15px]">
              <li className="flex justify-between border-b py-1">
                <span>Aslam Sheikh</span> <span className="font-medium text-primary">98%</span>
              </li>
              <li className="flex justify-between border-b py-1">
                <span>Sarah Amjad</span> <span className="font-medium text-primary">95%</span>
              </li>
              <li className="flex justify-between border-b py-1">
                <span>Ali Khan</span> <span className="font-medium text-primary">93%</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Nitasha kamran</span> <span className="font-medium text-primary">90%</span>
              </li>
            </ul>
          </div>

          {/* Report Card 2 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-[18px] font-semibold flex items-center gap-2 mb-3 text-[#4C0082]">
              <PieChart className="h-5 w-5 text-[#4C0082]" />
              Course Category Breakdown
            </h3>
            <ul className="space-y-2 text-[15px]">
              <li className="flex justify-between border-b py-1">
                <span>Programming</span> <span className="font-medium text-primary">45%</span>
              </li>
              <li className="flex justify-between border-b py-1">
                <span>Design</span> <span className="font-medium text-primary">25%</span>
              </li>
              <li className="flex justify-between border-b py-1">
                <span>Business</span> <span className="font-medium text-primary">20%</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Marketing</span> <span className="font-medium text-primary">10%</span>
              </li>
            </ul>
          </div>

          {/* Report Card 3 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-[18px] font-semibold flex items-center gap-2 mb-3 text-[#4C0082]">
              <TrendingUp className="h-5 w-5 text-[#4C0082]" />
              Growth Insights
            </h3>
            <p className="text-[14px] text-muted-foreground mb-4">
              Compared to last month:
            </p>
            <ul className="space-y-2 text-[15px]">
              <li className="flex justify-between border-b py-1">
                <span>New Student Registrations</span>
                <span className="font-medium text-green-600">+12%</span>
              </li>
              <li className="flex justify-between border-b py-1">
                <span>Course Ratings</span>
                <span className="font-medium text-green-600">+6%</span>
              </li>
              <li className="flex justify-between border-b py-1">
                <span>Instructor Retention</span>
                <span className="font-medium text-green-600">+4%</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Dropout Rate</span>
                <span className="font-medium text-red-500">-2%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
