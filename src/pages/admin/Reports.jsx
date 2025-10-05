import React from "react";
import Header from "@/components/dashboard/Header";
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
        <h2 className="text-[28px] font-semibold flex items-center gap-2 text-[#4C0082]">
          <FileBarChart className="h-6 w-6 text-[#4C0082]" />
          Reports & Analytics
        </h2>

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
            <h3 className="text-[20px] font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Platform Performance Overview
            </h3>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-[14px] text-muted-foreground">Active Students</p>
              <p className="text-[22px] font-bold text-primary">4,231</p>
              <p className="text-[13px] text-green-600 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> +8.4% this month
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-[14px] text-muted-foreground">Courses Published</p>
              <p className="text-[22px] font-bold text-primary">154</p>
              <p className="text-[13px] text-green-600 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> +3.2% this month
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-[14px] text-muted-foreground">Average Completion</p>
              <p className="text-[22px] font-bold text-primary">79%</p>
              <p className="text-[13px] text-green-600 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> +1.1% this month
              </p>
            </div>
          </div>

         {/* Analytic Chart*/}
<div className="h-64 flex flex-col items-center justify-center rounded-lg overflow-hidden border border-border">
  <svg
    viewBox="0 0 600 300"
    preserveAspectRatio="xMidYMid meet"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Sample analytics chart"
  >
    {/*horizontal grid*/}
    <line x1="40" x2="560" y1="60" y2="60" stroke="#eef2f7" strokeWidth="1" />
    <line x1="40" x2="560" y1="110" y2="110" stroke="#eef2f7" strokeWidth="1" />
    <line x1="40" x2="560" y1="160" y2="160" stroke="#eef2f7" strokeWidth="1" />
    <line x1="40" x2="560" y1="210" y2="210" stroke="#eef2f7" strokeWidth="1" />

    {/*x axis*/}
    <line x1="40" x2="560" y1="260" y2="260" stroke="#e6edf3" strokeWidth="1.5" />

    {/*bars*/}
    <rect x="80" y="100" width="60" height="160" rx="8" className="text-primary" fill="currentColor" />
    <rect x="170" y="140" width="60" height="120" rx="8" className="text-green-600" fill="currentColor" />
    <rect x="260" y="60" width="60" height="200" rx="8" className="text-blue-600" fill="currentColor" />
    <rect x="350" y="120" width="60" height="140" rx="8" className="text-yellow-500" fill="currentColor" />

    {/*small top markers*/}
    <circle cx="110" cy="95" r="3" className="text-primary" fill="currentColor" />
    <circle cx="200" cy="135" r="3" className="text-green-600" fill="currentColor" />
    <circle cx="290" cy="55" r="3" className="text-blue-600" fill="currentColor" />
    <circle cx="380" cy="115" r="3" className="text-yellow-500" fill="currentColor" />

    {/*week labels*/}
    <text x="110" y="282" fontSize="12" fill="#6b7280" textAnchor="middle">Week 1</text>
    <text x="200" y="282" fontSize="12" fill="#6b7280" textAnchor="middle">Week 2</text>
    <text x="290" y="282" fontSize="12" fill="#6b7280" textAnchor="middle">Week 3</text>
    <text x="380" y="282" fontSize="12" fill="#6b7280" textAnchor="middle">Week 4</text>

    {/*legend*/}
    <g transform="translate(430,30)" opacity="0.9">
      <rect x="0" y="-8" width="10" height="10" className="text-primary" fill="currentColor" rx="2" />
      <text x="16" y="0" fontSize="12" fill="#374151">Enrollments</text>

      <rect x="0" y="14" width="10" height="10" className="text-green-600" fill="currentColor" rx="2" />
      <text x="16" y="22" fontSize="12" fill="#374151">Completions</text>

      <rect x="0" y="36" width="10" height="10" className="text-blue-600" fill="currentColor" rx="2" />
      <text x="16" y="44" fontSize="12" fill="#374151">Instructor Activity</text>

      <rect x="0" y="58" width="10" height="10" className="text-yellow-500" fill="currentColor" rx="2" />
      <text x="16" y="66" fontSize="12" fill="#374151">Dropout Rate</text>
    </g>
  </svg>
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
