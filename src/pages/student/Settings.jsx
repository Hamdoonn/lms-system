"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Privacy");
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [settings, setSettings] = useState({
    learningProgress: true,
    achievements: true,
    messages: true,
    onlineStatus: false,
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load logged-in user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const tabs = ["Notifications", "Privacy", "Account", "Data"];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="w-full">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences and privacy settings
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mt-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 font-medium transition-all ${
                activeTab === tab
                  ? "text-[#7f2f82] border-b-2 border-[#7f2f82]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ---------- Privacy Tab ---------- */}
        {activeTab === "Privacy" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mt-6 p-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              🛡 Privacy Settings
            </h2>

            {/* Profile Visibility */}
            <div className="mt-6">
              <label className="block text-gray-700 font-medium">
                Profile visibility
              </label>
              <select
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="mt-2 w-60 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#7f2f82] focus:outline-none"
              >
                <option>Public</option>
                <option>Private</option>
                <option>Friends Only</option>
              </select>
              <p className="text-gray-500 text-sm mt-1">
                Control who can see your profile information
              </p>
            </div>

            <hr className="my-6" />

            {/* Toggles */}
            <div className="space-y-5">
              {[
                {
                  key: "learningProgress",
                  title: "Show learning progress",
                  desc: "Display your course progress on your profile",
                },
                {
                  key: "achievements",
                  title: "Show achievements",
                  desc: "Display your badges and achievements",
                },
                {
                  key: "messages",
                  title: "Allow messages",
                  desc: "Let other students and instructors send you messages",
                },
                {
                  key: "onlineStatus",
                  title: "Show online status",
                  desc: "Let others see when you're online",
                },
              ].map(({ key, title, desc }) => (
                <div
                  key={key}
                  className="flex items-center justify-between border-b border-gray-100 pb-4"
                >
                  <div>
                    <p className="font-medium text-gray-800">{title}</p>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => handleToggle(key)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                      settings[key] ? "bg-[#7f2f82]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                        settings[key] ? "translate-x-5" : ""
                      }`}
                    ></span>
                  </button>
                </div>
              ))}
            </div>

            {/* Save button */}
            <div className="flex justify-end mt-8">
              <Button
                onClick={handleSave}
                className="bg-[#7f2f82] text-white font-medium px-6 py-2 rounded-md hover:bg-[#6c2670] transition"
              >
                Save All Settings
              </Button>
            </div>
          </div>
        )}

        {/* ---------- Notifications Tab ---------- */}
        {activeTab === "Notifications" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mt-6 p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              🔔 Notification Settings
            </h2>
            <p className="text-gray-500 mt-1">
              Manage how you receive alerts and updates.
            </p>

            <div className="mt-6 space-y-5">
              {[
                {
                  key: "email",
                  title: "Email Notifications",
                  desc: "Receive updates about your courses and announcements.",
                },
                {
                  key: "sms",
                  title: "SMS Notifications",
                  desc: "Get SMS alerts for important account activities.",
                },
                {
                  key: "push",
                  title: "Push Notifications",
                  desc: "Receive instant alerts on your device.",
                },
              ].map(({ key, title, desc }) => (
                <div
                  key={key}
                  className="flex items-center justify-between border-b border-gray-100 pb-4"
                >
                  <div>
                    <p className="font-medium text-gray-800">{title}</p>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(key)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                      settings[key] ? "bg-[#7f2f82]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                        settings[key] ? "translate-x-5" : ""
                      }`}
                    ></span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Account Tab ---------- */}
        {activeTab === "Account" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mt-6 p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              👤 Account Settings
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your personal information and security.
            </p>

            {loggedInUser ? (
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Name</p>
                  <p className="font-medium text-gray-900">
                    {loggedInUser.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="font-medium text-gray-900">
                    {loggedInUser.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Role</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {loggedInUser.role}
                  </p>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button className="bg-[#7f2f82] text-white px-5 py-2 rounded-sm hover:bg-[#6a2670] transition">
                    Edit Profile
                  </Button>
                  <Button className="border bg-white text-zinc-500 border-gray-300 px-5 py-2 rounded-sm hover:bg-gray-100 transition">
                    Change Password
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mt-6">
                No user data found. Please log in.
              </p>
            )}
          </div>
        )}

        {/* ---------- Data Tab ---------- */}
        {activeTab === "Data" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mt-6 p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              📁 Data & Privacy
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your data and export personal information.
            </p>

            <div className="mt-6 space-y-5 flex gap-3.5">
              <Button className="bg-[#7f2f82] text-white px-5 py-2 rounded-sm hover:bg-[#6a2670] transition">
                Export My Data
              </Button>
              <Button className="bg-red-500 text-white px-5 py-2 rounded-sm hover:bg-red-600 transition">
                Delete My Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
