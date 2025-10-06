import React from "react";
import {
  Award,
  BookOpen,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  CheckCircle2,
  FileCheck2,
  CircleCheckBig,
  ChartColumn,
  TicketCheck,
  Check,
  Activity,
  HatGlasses,
  Cross,
  Ban,
} from "lucide-react";

// role base card data
const getStatsData = (role, page) => {
  if (role === "student") {
    if (page === "dashboard") {
      return [
        {
          icon: BookOpen,
          title: "Enrolled Courses",
          number: "2",
          percentage: "+12%",
          Trending: "Trending up this month",
        },
        {
          icon: Award,
          title: "Completed Courses",
          number: "5",
          percentage: "+8%",
          Trending: "Consistent growth",
        },
        {
          icon: TrendingUp,
          title: "Average Progress",
          number: "65%",
          percentage: "+5%",
          Trending: "Improved learning",
        },
        {
          icon: Clock,
          title: "Hours Learned",
          number: "30",
          percentage: "+10%",
          Trending: "Steady pace",
        },
      ];
    }
    if (page === "assignments") {
      return [
        {
          icon: FileText,
          title: "Total Assigments",
          number: "10",
          percentage: "+3%",
          Trending: "Assigments completed",
        },
        {
          icon: Clock,
          title: "Pending Assignments",
          number: "3",
          percentage: "-5%",
          Trending: "Fewer pending tasks",
        },
        {
          icon: CircleCheckBig,
          title: "Submitted",
          number: "6",
          percentage: "+15%",
          Trending: "Great effort",
        },
        {
          icon: FileCheck2,
          title: "Graded",
          number: "4",
          percentage: "+20%",
          Trending: "Results improving",
        },
      ];
    }
    if (page === "grades") {
      return [
        {
          icon: Award,
          title: "Total Subjects",
          number: "6",
          percentage: "+0%",
          Trending: "Stable",
        },
        {
          icon: TrendingUp,
          title: "Passed",
          number: "5",
          percentage: "+16%",
          Trending: "Good results",
        },
        {
          icon: Clock,
          title: "Failed",
          number: "1",
          percentage: "-4%",
          Trending: "Needs improvement",
        },
        {
          icon: ChartColumn,
          title: "Overall Average",
          number: "85.4%",
          percentage: "+1.1%",
          Trending: "Improved Result",
        },
      ];
    }
  }

  if (role === "instructor") {
    if (page === "dashboard") {
      return [
        {
          icon: BookOpen,
          title: "Courses Created",
          number: "4",
          percentage: "+10%",
          Trending: "Growing content",
        },
        {
          icon: Users,
          title: "Students Enrolled",
          number: "120",
          percentage: "+12%",
          Trending: "High activity",
        },
        {
          icon: Award,
          title: "Assignments Given",
          number: "10",
          percentage: "+5%",
          Trending: "Active teaching",
        },
        {
          icon: Clock,
          title: "Hours Taught",
          number: "80",
          percentage: "+18%",
          Trending: "More classes",
        },
      ];
    }
    if (page === "assignments") {
      return [
        {
          icon: BookOpen,
          title: "Pending Reviews",
          number: "12",
          percentage: "+8%",
          Trending: "Workload increase",
        },
        {
          icon: Award,
          title: "Reviewed",
          number: "34",
          percentage: "+22%",
          Trending: "Good progress",
        },
      ];
    }
  }

  if (role === "admin") {
    if (page === "dashboard") {
      return [
        {
          icon: Users,
          title: "Total Users",
          number: "500",
          percentage: "+15%",
          Trending: "Community growing",
        },
        {
          icon: BookOpen,
          title: "Active Courses",
          number: "35",
          percentage: "+10%",
          Trending: "Platform expanding",
        },
        {
          icon: Award,
          title: "Instructors",
          number: "15",
          percentage: "+5%",
          Trending: "Faculty growth",
        },
        {
          icon: DollarSign,
          title: "Revenue",
          number: "$20k",
          percentage: "+25%",
          Trending: "Strong growth",
        },
      ];
    }
    if (page === "reports") {
      return [
        {
          icon: Users,
          title: "Active Students",
          number: "4231",
          percentage: "+8.4%",
          Trending: "This month",
        },
        {
          icon: BookOpen,
          title: "Courses Published",
          number: "154",
          percentage: "+3.2%",
          Trending: "This month",
        },
        {
          icon: Check,
          title: "Average Completion",
          number: "79%",
          percentage: "+1.1%",
          Trending: "This month",
        },
      ];
    }
    if (page === "users") {
      return [
        {
          icon: Users,
          title: "Total Users",
          number: "16",
        },
        {
          icon: Activity,
          title: "Active Users",
          number: "14",
        },
        {
          icon: HatGlasses,
          title: "Instructors",
          number: "7",
        },
        {
          icon: Ban,
          title: "Suspended Users",
          number: "2",
        },
      ];
    }
  }

  return [];
};

const StatsCard = ({ role, page }) => {
  let cardContent = getStatsData(role, page);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
      {cardContent.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="rounded-xl border bg-white p-4 min-h-[180px] flex flex-col justify-between gap-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-md text-black font-semibold">{card.title}</h2>
              <div className="flex justify-center items-center w-10 h-10 rounded-sm bg-[#4c008210]">
                {Icon && <Icon className="h-6 w-6 text-[#4B0082]" />}
              </div>
            </div>
            <h1 className="text-4xl font-bold">{card.number}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-green-600">
                {card.percentage}
              </span>
              <span className="font-medium text-zinc-400">{card.Trending}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCard;
