import {
  Dashboard,
  BookOnline,
  LocalHotel,
  SupervisorAccount,
  Category,
  Settings,
  Summarize,
} from "@mui/icons-material";

export const navbarStructure = () => {
  return [
    {
      icon: <Dashboard />,
      label: "Dashboard",
      url: "/admin",
      key: "dashboard",
      role: ["FRONT_DESK", "ADMIN"],
    },

    {
      icon: <BookOnline />,
      label: "Bookings",
      url: "/admin/bookings",
      key: "booking",
      role: ["FRONT_DESK", "ADMIN"],
    },
    {
      icon: <Category />,
      label: "Amenities",
      url: "/admin/amenities",
      key: "amenities",
      role: ["ADMIN"],
    },
    {
      icon: <LocalHotel />,
      label: "Room Management",
      url: "/admin/room-management",
      key: "room-management",
      role: ["ADMIN"],
    },
    {
      icon: <Summarize />,
      label: "Reports",
      url: "/admin/reports",
      key: "reports",
      role: ["ADMIN"],
    },
    {
      icon: <SupervisorAccount />,
      label: "Users",
      url: "/admin/users",
      key: "users",
      role: ["ADMIN"],
    },
    {
      icon: <Settings />,
      label: "Configuration",
      url: "/admin/configurations",
      key: "configuration",
      role: ["ADMIN"],
    },
  ];
};
