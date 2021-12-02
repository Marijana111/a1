import { List, Sliders, User, Archive } from "react-feather";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ErrorIcon from "@mui/icons-material/Error";
import TableChartIcon from "@mui/icons-material/TableChart";
import NotificationsIcon from "@mui/icons-material/Notifications";

const pagesSection = [
  {
    href: "/",
    icon: Sliders,
    title: "Naslovnica",
    //children: [
    // {
    //   href: "/default",
    //   title: "Default",
    // },
    // {
    //   href: "/analytics",
    //   title: "Analytics",
    // },
    // {
    //   href: "/saas",
    //   title: "SaaS",
    // },
    //],
  },
  // {
  //   href: "/pages",
  //   icon: Layout,
  //   title: "Pages",
  //   children: [
  //     {
  //       href: "/pages/profile",
  //       title: "Profile",
  //     },
  //     {
  //       href: "/pages/settings",
  //       title: "Settings",
  //     },
  //     {
  //       href: "/pages/pricing",
  //       title: "Pricing",
  //     },
  //     {
  //       href: "/pages/chat",
  //       title: "Chat",
  //     },
  //     {
  //       href: "/pages/blank",
  //       title: "Blank Page",
  //     },
  //   ],
  // },
  // {
  //   href: "/projects",
  //   icon: Briefcase,
  //   title: "Projects",
  //   badge: "8",
  // },
  // {
  //   href: "/orders",
  //   icon: ShoppingCart,
  //   title: "Orders",
  // },
  // {
  //   href: "/invoices",
  //   icon: CreditCard,
  //   title: "Invoices",
  //   children: [
  //     {
  //       href: "/invoices",
  //       title: "List",
  //     },
  //     {
  //       href: "/invoices/detail",
  //       title: "Detail",
  //     },
  //   ],
  // },
  // {
  //   href: "/tasks",
  //   icon: CheckSquare,
  //   title: "Tasks",
  //   badge: "17",
  // },
  // {
  //   href: "/calendar",
  //   icon: Calendar,
  //   title: "Calendar",
  // },
  // {
  // href: "/auth",
  // icon: Users,
  // title: "Auth",
  // children: [
  //   {
  //     href: "/auth/sign-in",
  //     title: "Sign In",
  //   },
  //   {
  //     href: "/auth/sign-up",
  //     title: "Sign Up",
  //   },
  //   {
  //     href: "/auth/reset-password",
  //     title: "Reset Password",
  //   },
  //   {
  //     href: "/auth/404",
  //     title: "404 Page",
  //   },
  //   {
  //     href: "/auth/500",
  //     title: "500 Page",
  //   },
  // ],
  // },
];

const elementsSection = [
  // {
  //   href: "/components",
  //   icon: Grid,
  //   title: "Components",
  //   children: [
  //     {
  //       href: "/components/alerts",
  //       title: "Alerts",
  //     },
  //     {
  //       href: "/components/accordion",
  //       title: "Accordion",
  //     },
  //     {
  //       href: "/components/avatars",
  //       title: "Avatars",
  //     },
  //     {
  //       href: "/components/badges",
  //       title: "Badges",
  //     },
  //     {
  //       href: "/components/buttons",
  //       title: "Buttons",
  //     },
  //     {
  //       href: "/components/cards",
  //       title: "Cards",
  //     },
  //     {
  //       href: "/components/chips",
  //       title: "Chips",
  //     },
  //     {
  //       href: "/components/dialogs",
  //       title: "Dialogs",
  //     },
  //     {
  //       href: "/components/lists",
  //       title: "Lists",
  //     },
  //     {
  //       href: "/components/menus",
  //       title: "Menus",
  //     },
  //     {
  //       href: "/components/pagination",
  //       title: "Pagination",
  //     },
  //     {
  //       href: "/components/progress",
  //       title: "Progress",
  //     },
  //     {
  //       href: "/components/snackbars",
  //       title: "Snackbars",
  //     },
  //     {
  //       href: "/components/tooltips",
  //       title: "Tooltips",
  //     },
  //   ],
  // },
  // {
  //   href: "/charts",
  //   icon: PieChart,
  //   title: "Charts",
  // },
  // {
  //   href: "/forms",
  //   icon: CheckSquare,
  //   title: "Forms",
  //   children: [
  //     {
  //       href: "/forms/pickers",
  //       title: "Pickers",
  //     },
  //     {
  //       href: "/forms/selection-controls",
  //       title: "Selection Controls",
  //     },
  //     {
  //       href: "/forms/selects",
  //       title: "Selects",
  //     },
  //     {
  //       href: "/forms/text-fields",
  //       title: "Text Fields",
  //     },
  //     {
  //       href: "/forms/editors",
  //       title: "Editors",
  //     },
  //     {
  //       href: "/forms/formik",
  //       title: "Formik",
  //     },
  //   ],
  // },
  {
    href: "/tables/data-grid",
    icon: User,
    title: "Korisnici",
    // children: [
    //   // {
    //   //   href: "/tables/simple-table",
    //   //   title: "Simple Table",
    //   // },
    //   // {
    //   //   href: "/tables/advanced-table",
    //   //   title: "Advanced Table",
    //   // },
    //   {
    //     href: "/tables/data-grid",
    //     title: "Pregled korisnika",
    //   },
    // ],
  },
  {
    href: "/tables/data-grid",
    icon: TableChartIcon,
    title: "Zahtjevi",
  },
  {
    href: "/tables/data-grid",
    icon: ErrorIcon,
    title: "Smetnje",
  },
  {
    href: "/tables/data-grid",
    icon: Archive,
    title: "Izvještaji",
  },
  {
    href: "/tables/data-grid",
    icon: VpnKeyIcon,
    title: "Šifrarnik",
  },
  {
    href: "/tables/data-grid",
    icon: NotificationsIcon,
    title: "Obavijesti",
  },
  // {
  //   href: "/icons",
  //   icon: Heart,
  //   title: "Icons",
  //   children: [
  //     {
  //       href: "/icons/material-icons",
  //       title: "Material Icons",
  //     },
  //     {
  //       href: "/icons/feather-icons",
  //       title: "Feather Icons",
  //     },
  //   ],
  // },
  // {
  //   href: "/maps",
  //   icon: Map,
  //   title: "Maps",
  //   children: [
  //     {
  //       href: "/maps/google-maps",
  //       title: "Google Maps",
  //     },
  //     {
  //       href: "/maps/vector-maps",
  //       title: "Vector Maps",
  //     },
  //   ],
  // },
];

// const docsSection = [
//   {
//     href: "/documentation/welcome",
//     icon: BookOpen,
//     title: "Documentation",
//   },
//   {
//     href: "/changelog",
//     icon: List,
//     title: "Changelog",
//     badge: "v3.1.0",
//   },
// ];

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
  {
    title: "Elements",
    pages: elementsSection,
  },
  // {
  //   title: "Material App",
  //   pages: docsSection,
  // },
];

export default navItems;
