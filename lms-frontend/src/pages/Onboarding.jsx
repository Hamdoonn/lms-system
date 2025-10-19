import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  IconCheck,
  IconClipboardCheck,
  IconChartBar,
  IconBooks,
} from "@tabler/icons-react";

const MockupFrame = ({ src = "/assets/dashboard1.png" }) => {
  return (
    <div className="relative w-full max-w-[760px]">
      {/* floating soft shadow */}
      <div className="absolute -inset-4 rounded-2xl bg-white/0 shadow-xl filter blur-xl opacity-8 pointer-events-none" />

      {/* laptop / browser style frame */}
      <div
        className="relative rounded-2xl bg-white border border-gray-100 shadow-lg
                   overflow-hidden"
        style={{
          //  (outer shadow)
          boxShadow:
            "0 8px 20px rgba(16,24,40,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {/* browser toolbar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b border-gray-100"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#4B0082]" />
            <span className="h-3 w-3 rounded-full bg-gray-300" />
            <span className="h-3 w-3 rounded-full bg-gray-300" />
          </div>
          <div className="mx-auto text-sm text-gray-600">
            learnix.app — Dashboard
          </div>
        </div>

        {/* screen area */}
        <div
          className="w-full h-[420px] bg-gray-50 flex items-center justify-center"
          role="img"
          aria-label="Dashboard preview placeholder"
        >
          {/* placeholder image or framed area */}
          <div
            className="w-[92%] h-[88%] rounded-lg border border-gray-100 shadow-inner bg-white flex items-center justify-center text-gray-400 text-sm"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <img
              src={src}
              alt="Dashboard placeholder"
              className="object-contain w-full h-full rounded-md"
              onError={(e) => {
                // show text if image missing
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* subtle caption */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Learnix is your go to platform
      </div>
    </div>
  );
};

const Onboarding = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Student",
      tagline: "Explore courses & learn at your own pace",
      features: [
        "Curated course library",
        "Progress tracking & grades",
        "Seamless assignment submissions",
      ],
      roleKey: "student",
    },
    {
      title: "Instructor",
      tagline: "Create engaging courses and assess students",
      features: [
        "Publish interactive courses",
        "Manage assignments & grading",
        "Monitor student engagement",
      ],
      roleKey: "instructor",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Empower your learning journey
            </h1>

            <p className="mt-5 max-w-xl text-lg text-gray-600 leading-relaxed">
              Learnix brings courses, assignments, grading and reporting into
              one clean, focused workspace. Built for learners and educators who
              value clarity and results.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Button
                onClick={() => navigate("/auth/Login")}
                className="cursor-pointer rounded-sm bg-[#4B0082] hover:bg-[#390069] text-white px-6 py-3 shadow-md"
              >
                Get started
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Courses
                </span>
                <strong className="mt-1 text-5xl text-gray-900">60+</strong>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Instructors
                </span>
                <strong className="mt-1 text-5xl text-gray-900">25+</strong>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Students
                </span>
                <strong className="mt-1 text-5xl text-gray-900">10k+</strong>
              </div>
            </div>
          </div>

          {/* Mockup frame */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <MockupFrame />
          </div>
        </section>

        {/* HOW IT WORKS / FEATURES */}
        <section className="mt-20">
          <div className="flex flex-col justify-center items-center mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-gray-900">
              How Learnix helps
            </h2>
            <p className="mt-2 max-w-[450px] text-gray-600">
              Organized courses, simple grading, and clear progress tracking —
              all in a single platform.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CARD 1 */}
            <div
              className="rounded-xl p-6 bg-white border border-gray-100 shadow-sm"
              style={{ boxShadow: "0 6px 18px rgba(16,24,40,0.03)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center h-11 w-11 rounded-md"
                  style={{ background: "rgba(75,0,130,0.08)" }}
                >
                  <IconBooks size={24} className="text-[#4B0082]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Organized Courses
                </h3>
              </div>
              <p className="mt-3 text-md text-gray-600">
                Browse and enroll in curated courses with structured modules and
                resources.
              </p>
            </div>

            {/* CARD 2 */}
            <div
              className="rounded-xl p-6 bg-white border border-gray-100 shadow-sm"
              style={{ boxShadow: "0 6px 18px rgba(16,24,40,0.03)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center h-11 w-11 rounded-md"
                  style={{ background: "rgba(75,0,130,0.08)" }}
                >
                  <IconClipboardCheck size={24} className="text-[#4B0082]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Assignments & Grading
                </h3>
              </div>
              <p className="mt-3 text-md text-gray-600">
                Simplified assignment flow with clear submission and grading
                workflows.
              </p>
            </div>

            {/* CARD 3 */}
            <div
              className="rounded-xl p-6 bg-white border border-gray-100 shadow-sm"
              style={{ boxShadow: "0 6px 18px rgba(16,24,40,0.03)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center h-11 w-11 rounded-md"
                  style={{ background: "rgba(75,0,130,0.08)" }}
                >
                  <IconChartBar size={24} className="text-[#4B0082]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Analytics
                </h3>
              </div>
              <p className="mt-3 text-md text-gray-600">
                Insights into engagement, progress, and course performance.
              </p>
            </div>
          </div>
        </section>

        {/* ROLES (Informational cards only) */}
        <section className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-semibold text-gray-900">
              Who is Learnix for?
            </h3>
            <p className="mt-2 text-gray-600">
              Whether you're learning or teaching — Learnix adapts to the way
              you work.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((r) => (
              <article
                key={r.roleKey}
                className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: "0 8px 20px rgba(16,24,40,0.04)",
                }}
                aria-labelledby={`role-${r.roleKey}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center h-12 w-12 rounded-md"
                    style={{ background: "rgba(75,0,130,0.06)" }}
                    aria-hidden
                  >
                    <span className="text-[#4B0082] font-bold text-lg">
                      {r.title.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <h4
                      id={`role-${r.roleKey}`}
                      className="text-lg font-semibold text-gray-900"
                    >
                      {r.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">{r.tagline}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {r.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#4B0082]">
                        <IconCheck size={14} />
                      </span>
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* small animation keyframes */}
      <style>{`
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default Onboarding;
