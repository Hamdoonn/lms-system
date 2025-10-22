"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample monochrome data
const chartData = [
  { browser: "React Basics", visitors: 45 },
  { browser: "NodeJS Fundamentals", visitors: 70 },
  { browser: "CSS Mastery", visitors: 55 },
  { browser: "Python Basics", visitors: 30 },
  { browser: "SQL Fundamentals", visitors: 60 },
];

// Monochrome shades of #4b0082
const shades = ["#4b0082", "#5c1990", "#6d33a0", "#7e4db0", "#8f66c0"];

// Config object for ChartContainer
const chartConfig = {
  visitors: { label: "Progress %" },
  "React Basics": { label: "React Basics", color: shades[0] },
  "NodeJS Fundamentals": { label: "NodeJS Fundamentals", color: shades[1] },
  "CSS Mastery": { label: "CSS Mastery", color: shades[2] },
  "Python Basics": { label: "Python Basics", color: shades[3] },
  "SQL Fundamentals": { label: "SQL Fundamentals", color: shades[4] },
};

export default function ChartPieLabel() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Student Progress</CardTitle>
        <CardDescription>All enrolled courses</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig} // ✅ Pass the config here
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              label
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={shades[index % shades.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing progress percentage for sample courses
        </div>
      </CardFooter>
    </Card>
  );
}
