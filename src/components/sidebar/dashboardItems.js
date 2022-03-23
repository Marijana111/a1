import { List, Sliders, User, Archive } from "react-feather";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ErrorIcon from "@mui/icons-material/Error";
import TableChartIcon from "@mui/icons-material/TableChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { FormatListNumbered, ListAlt, Settings } from "@mui/icons-material";

const pagesSection = [
  {
    href: "/home",
    icon: Sliders,
    title: "Naslovna",
  },
];

const elementsSection = [
  {
    href: "/daily-list",
    icon: ListAlt,
    title: "Dnevna lista",
  },
  {
    href: "/requests",
    icon: TableChartIcon,
    title: "Zahtjevi",
  },
  {
    href: "/fault-orders",
    icon: ErrorIcon,
    title: "Smetnje",
  },

  {
    href: "/report-orders",
    icon: Archive,
    title: "Izvještaji",
  },
  {
    href: "/settings",
    icon: Settings,
    title: "Postavke",
    children: [
      {
        href: "/settings/users",
        title: "Korisnici",
      },
      {
        href: "/settings/operators",
        title: "Operatori",
      },
    ],
  },
];

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
  {
    title: "Elements",
    pages: elementsSection,
  },
];

export default navItems;
