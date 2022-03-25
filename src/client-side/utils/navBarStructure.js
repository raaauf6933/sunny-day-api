import React from "react";

import {
  Home,
  KingBed,
  Collections,
  PeopleAlt,
  ContactPage,
  BookOnline,
} from "@mui/icons-material";

export const navBarStructure = [
  {
    name: "home",
    label: "Home",
    icon: <Home />,
    url: "/",
  },
  {
    name: "rooms",
    label: "Rooms",
    icon: <KingBed />,
    url: "/rooms",
  },
  {
    name: "gallery",
    label: "Gallery",
    icon: <Collections />,
    url: "/gallery",
  },
  {
    name: "aboutUs",
    label: "About Us",
    icon: <PeopleAlt />,
    url: "/about-us",
  },
  {
    name: "contact",
    label: "Contact",
    icon: <ContactPage />,
    url: "/contact",
  },
  {
    name: "mybooking",
    label: "My Booking",
    icon: <BookOnline />,
    url: "/my-booking",
  },
];
