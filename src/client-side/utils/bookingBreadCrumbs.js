import {
  DateRange,
  KingBed,
  ContactPage,
  Pageview,
  CheckCircle,
} from "@mui/icons-material";

export const bookingBreadCrumbs = [
  {
    name: "pickDate",
    label: "Pick Date",
    icon: <DateRange sx={{ mr: 0.5 }} size="lg" />,
    step: 1,
  },
  {
    name: "rooms",
    label: "Rooms",
    icon: <KingBed sx={{ mr: 0.5 }} size="lg" />,
    step: 2,
  },
  {
    name: "guestInformation",
    label: "Guest Information",
    icon: <ContactPage sx={{ mr: 0.5 }} size="lg" />,
    step: 3,
  },
  {
    name: "review",
    label: "Review  ",
    icon: <Pageview sx={{ mr: 0.5 }} size="lg" />,
    step: 4,
  },
  {
    name: "confirmation",
    label: "Confirmation",
    icon: <CheckCircle sx={{ mr: 0.5 }} size="lg" />,
    step: 5,
  },
];
