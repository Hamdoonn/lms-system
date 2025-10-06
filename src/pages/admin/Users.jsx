import React, { useState, useMemo } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  Users as UsersIcon,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Slash,
} from "lucide-react";
import EnrolledCourses from "../student/courses/EnrolledCourses";

const Users = () => {
  const allUsers = [
    {
      id: 1,
      name: "Aslam Sheikh",
      email: "aslamsheikh@example.com",
      role: "Instructor",
      status: "Active",
      joined: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Sarah Amjad",
      email: "sarahamjad@example.com",
      role: "Instructor",
      status: "Active",
      joined: "Feb 3, 2024",
    },
    {
      id: 3,
      name: "Ali Khan",
      email: "alikhan@example.com",
      role: "Instructor",
      status: "Active",
      joined: "Mar 28, 2024",
    },
    {
      id: 4,
      name: "Nitasha kamran",
      email: "nitashakamran@example.com",
      role: "Instructor",
      status: "Active",
      joined: "May 2, 2024",
    },
    {
      id: 5,
      name: "safwan shahid",
      email: "safwanshahid@example.com",
      role: "Student",
      status: "Active",
      joined: "Jul 10, 2024",
    },
    {
      id: 6,
      name: "Hamdoon shahid",
      email: "hamdoonshahid@example.com",
      role: "Student",
      status: "Active",
      joined: "Aug 18, 2024",
    },
    {
      id: 7,
      name: "Raffae majeed",
      email: "raffaemajeed@example.com",
      role: "student",
      status: "Suspended",
      joined: "Sep 4, 2024",
    },
    {
      id: 8,
      name: "Umair Tahir",
      email: "umairtahir@example.com",
      role: "Student",
      status: "Active",
      joined: "Sep 15, 2024",
    },
    {
      id: 10,
      name: "Zain bashir",
      email: "zainbashir@example.com",
      role: "Student",
      status: "Active",
      joined: "Sep 20, 2024",
    },
    {
      id: 11,
      name: "Ilyas khan",
      email: "ilyaskhan@example.com",
      role: "Student",
      status: "Suspended",
      joined: "Sep 22, 2024",
    },
    {
      id: 12,
      name: "Daniyal Shabir",
      email: "daniyalshabir@example.com",
      role: "Student",
      status: "Active",
      joined: "Sep 25, 2024",
    },
    {
      id: 13,
      name: "hamza abbasi",
      email: "hamzaabbasi@example.com",
      role: "Instructor",
      status: "Active",
      joined: "Sep 22, 2024",
    },
    {
      id: 14,
      name: "Rayan kamal",
      email: "rayankamal@example.com",
      role: "Student",
      status: "Active",
      joined: "Sep 20, 2024",
    },
    {
      id: 15,
      name: "Asadullah",
      email: "asadullah@example.com",
      role: "Student",
      status: "Active",
      joined: "oct 4, 2024",
    },
    {
      id: 16,
      name: "Hanan babar",
      email: "hananbabar@example.com",
      role: "Instructor",
      status: "Active",
      joined: "Jan 2, 2023",
    },
    {
      id: 17,
      name: "Bilal anwar",
      email: "bilalanwar@example.com",
      role: "Instructor",
      status: "Active",
      joined: "Feb 6, 2022",
    },
  ];

  // --- State management ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // --- Filtering logic ---
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filterRole === "All" || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, filterRole, allUsers]);

  // --- Pagination logic ---
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  //--- Dynamic Data Updation Logic ---
  const totalStudents = allUsers.filter(
    (u) => u.role.toLowerCase() === "student"
  ).length;
  const totalInstructors = allUsers.filter(
    (u) => u.role.toLowerCase() === "instructor"
  ).length;
  const totalUsers = allUsers.length;

  const averageCompletion = Math.round((totalStudents / totalUsers) * 100);

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mt-6 mb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[28px] font-semibold flex items-center gap-2">
            User Management
          </h2>
          <p>Manage users, roles, and account activity efficiently.</p>
        </div>

        <button className="flex items-center gap-2 bg-[#4C0082] text-white px-4 py-2 rounded-lg hover:bg-[#4C0082]/90 transition hover:shadow-lg hover:scale[1.02] hover:-translate-y-0.5 hover:shadow-purple-500/50 hover:duration-300 hover:ease-in-out  hover: tracking-normal hover:translation-duration-300 hover:translation-ease-in-out ">
          <UserPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Overview Cards */}
      <StatsCard role="admin" page="users" />
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterRole}
            onChange={(e) => {
              setFilterRole(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-border bg-card text-sm rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Student">Students</option>
            <option value="Instructor">Instructors</option>
            <option value="Admin">Admins</option>
          </select>

          <button className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted/30 transition">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-muted/40 border-b">
            <tr className="text-muted-foreground">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Joined</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-none hover:bg-muted/30 transition"
                >
                  <td className="px-6 py-3 font-medium">{user.name}</td>
                  <td className="px-6 py-3 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-[12px] font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">
                    {user.joined}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-3 text-muted-foreground">
                      <button className="hover:text-primary">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="hover:text-red-500">
                        <Slash className="h-4 w-4" />
                      </button>
                      <button className="hover:text-muted-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-6 text-center text-muted-foreground"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-muted-foreground">
        <p>
          Showing {startIndex + 1}–
          {Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`bg-[#4C0082] text-white  hover:bg-[#4C0082]/90 transition hover:shadow-lg hover:scale[1.02] hover:-translate-y-0.5 hover:shadow-purple-500/50 hover:duration-300 hover:ease-in-out  hover: tracking-normal hover:translation-duration-300 hover:translation-ease-in-out  px-3 py-1 rounded-lg border ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#4C0082]/30"
            }`}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`bg-[#4C0082] text-white  hover:bg-[#4C0082]/90 transition hover:shadow-lg hover:scale[1.02] hover:-translate-y-0.5 hover:shadow-purple-500/50 hover:duration-300 hover:ease-in-out  hover: tracking-normal hover:translation-duration-300 hover:translation-ease-in-out    px-3 py-1 rounded-lg border ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#4C0082]/30"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
