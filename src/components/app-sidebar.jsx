import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Home,
  Book,
  BookOpen,
  FileText,
  CheckCircle,
  User,
  Settings,
  Library,
  PlusCircle,
  List,
  Users,
  BarChart,
  LogOut,
  Bell,
} from "lucide-react";
import { sidebarConfig } from "@/lib/sidebarConfig";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import StudentDashboard from "@/pages/student/StudentDashboard";

// Map of icons
const iconMap = {
  home: Home,
  book: Book,
  "book-open": BookOpen,
  "file-text": FileText,
  "check-circle": CheckCircle,
  user: User,
  settings: Settings,
  library: Library,
  "plus-circle": PlusCircle,
  list: List,
  users: Users,
  "bar-chart": BarChart,
};

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [menuConfig, setMenuConfig] = useState([]);
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setMenuConfig(sidebarConfig[parsedUser.role] || []);
    }
  }, []);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  //logout users
  const handleLogOut = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/auth/Login", { replace: true });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="icon" className="bg-background border-r group ">
          {/* Header */}
          <SidebarHeader>
            <div className="flex items-start justify-start gap-3 py-2  font-semibold group ">
              {/* Logo - always visible */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#4c0082] shrink-0">
                <span className="text-xl font-bold text-white">L</span>
              </div>

              {/* Text - hidden when collapsed */}
              <div className="group-data-[state=collapsed]:hidden">
                <h2 className="text-[#4B0082] font-bold text-3xl uppercase">
                  Learnix
                </h2>
                <span className="text-sm text-muted-foreground">
                  E-Learning Platform
                </span>
              </div>
            </div>
          </SidebarHeader>

          {/* Menu Content */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                {menuConfig.map((item, idx) => {
                  const Icon = iconMap[item.icon] || null;

                  if (item.children) {
                    const isOpen = openMenus[item.label];
                    return (
                      <SidebarMenuItem key={idx}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              onClick={() => toggleMenu(item.label)}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                {Icon && <Icon className="h-4 w-4" />}
                                <span className="group-data-[state=collapsed]:hidden">
                                  {item.label}
                                </span>
                              </div>
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 transition-transform group-data-[state=collapsed]:hidden",
                                  isOpen && "rotate-90"
                                )}
                              />
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {item.label}
                          </TooltipContent>
                        </Tooltip>

                        {isOpen && (
                          <SidebarMenuSub>
                            {item.children.map((child, cIdx) => {
                              const ChildIcon = iconMap[child.icon] || null;
                              const active = location.pathname === child.path;
                              return (
                                <SidebarMenuSubItem key={cIdx}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <SidebarMenuButton
                                        asChild
                                        className={cn(
                                          active &&
                                            "bg-accent text-accent-foreground"
                                        )}
                                      >
                                        <Link
                                          to={child.path}
                                          className="flex items-center gap-2"
                                        >
                                          {ChildIcon && (
                                            <ChildIcon className="h-4 w-4" />
                                          )}
                                          <span className="group-data-[state=collapsed]:hidden">
                                            {child.label}
                                          </span>
                                        </Link>
                                      </SidebarMenuButton>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                      {child.label}
                                    </TooltipContent>
                                  </Tooltip>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuItem>
                    );
                  }

                  const active = location.pathname === item.path;
                  return (
                    <SidebarMenuItem key={idx}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            className={cn(
                              "flex items-center gap-2",
                              active && "bg-accent text-accent-foreground"
                            )}
                          >
                            <Link to={item.path}>
                              {Icon && <Icon className="h-4 w-4" />}
                              <span className="group-data-[state=collapsed]:hidden">
                                {item.label}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer Profile */}
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://i.pravatar.cc/40" />
                          <AvatarFallback>
                            {user?.name?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left group-data-[state=collapsed]:hidden">
                          <span className="text-sm font-medium">
                            {user?.name || "Guest"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {user?.email || ""}
                          </span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-3">
                    <div className="flex items-center gap-2 border-b pb-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://i.pravatar.cc/40" />
                        <AvatarFallback>
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {user?.role}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted">
                        <User size={16} /> Profile
                      </button>
                      <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted">
                        <Bell size={16} /> Notifications
                      </button>
                      <button
                        onClick={handleLogOut}
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted text-red-600"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <SidebarTrigger className="mb-4" />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
