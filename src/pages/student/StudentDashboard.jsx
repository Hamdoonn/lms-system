import Header from "@/components/dashboard/Header";
import { Award, BookOpen, Clock, Icon, TrendingUp } from "lucide-react";

const StudentDashboard = () => {
  const cardContent = [
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
      percentage: "+12%",
      Trending: "Trending up this month",
    },
    {
      icon: TrendingUp,
      title: "Average Progress",
      number: "65%",
      percentage: "+12%",
      Trending: "Trending up this month",
    },
    {
      icon: Clock,
      title: "Hours Learned",
      number: "30",
      percentage: "+12%",
      Trending: "Trending up this month",
    },
  ];
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
        {cardContent.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="rounded-xl border bg-white p-4 min-h-[180px] flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-zinc-400 font-semibold">
                  {card.title}
                </h2>
                <div className="flex justify-center items-center w-10 h-10 rounded-sm bg-[#4c008210]">
                  {Icon && <Icon className="h-6 w-6 text-[#4B0082] " />}
                </div>
              </div>
              <h1 className="text-4xl font-bold">{card.number}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium text-green-600">
                  {card.percentage}
                </span>
                <span className="font-medium text-zinc-400">
                  {card.Trending}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StudentDashboard;
