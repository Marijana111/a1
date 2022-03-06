import React from "react";

import async from "./components/Async";

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import DocLayout from "./layouts/Doc";
//import PresentationLayout from "./layouts/Presentation";

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";

// Components
import Accordion from "./pages/components/Accordion";
import Alerts from "./pages/components/Alerts";
import Avatars from "./pages/components/Avatars";
import Badges from "./pages/components/Badges";
import Buttons from "./pages/components/Buttons";
import Cards from "./pages/components/Cards";
import Chips from "./pages/components/Chips";
import Dialogs from "./pages/components/Dialogs";
import Lists from "./pages/components/Lists";
import Menus from "./pages/components/Menus";
import Pagination from "./pages/components/Pagination";
import Progress from "./pages/components/Progress";
import Snackbars from "./pages/components/Snackbars";
import Tooltips from "./pages/components/Tooltips";

import SelectionCtrls from "./pages/forms/SelectionControls";
import Selects from "./pages/forms/Selects";
import TextFields from "./pages/forms/TextFields";

import MaterialIcons from "./pages/icons/MaterialIcons";

import SimpleTable from "./pages/tables/SimpleTable";
import AdvancedTable from "./pages/tables/AdvancedTable";

import Landing from "./pages/presentation/Landing";

import ProtectedPage from "./pages/protected/ProtectedPage";
import RequestDetail from "./pages/tables/Requests/RequestDetail";
import FaultOrderDetail from "./pages/tables/FaultOrders/FaultOrderDetail";
import ReportOrderDetail from "./pages/tables/ReportOrders/ReportOrderDetails";

const Default = async(() => import("./pages/dashboards/Default"));
const Analytics = async(() => import("./pages/dashboards/Analytics"));
const SaaS = async(() => import("./pages/dashboards/SaaS"));

const DataGrid = async(() => import("./pages/tables/DataGrid"));
const AddUser = async(() => import("./pages/tables/User/AddUser"));

const DataGridRequests = async(() =>
  import("./pages/tables/Requests/DataGridRequests")
);

const AddStatus = async(() => import("./pages/tables/Requests/AddStatus"));
const DataGridFaultOrders = async(() =>
  import("./pages/tables/FaultOrders/DataGridFaultOrders")
);
const AddStatusFaulOrders = async(() =>
  import("./pages/tables/FaultOrders/AddStatus")
);

const DataGridReportOrders = async(() =>
  import("./pages/tables/ReportOrders/DataGridReportOrders")
);

const DataGridConfiguration = async(() =>
  import("./pages/tables/DataGridConfiguration")
);

const routes = [
  {
    path: "/home",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Default />,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
    ],
  },

  {
    path: "settings",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "users",
        element: <DataGrid />,
      },
      {
        path: "operators",
        element: <DataGrid />,
      },
    ],
  },

  {
    path: "requests",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DataGridRequests />,
      },
      {
        path: "details/:id",
        element: <RequestDetail />,
      },
      {
        path: "add-status",
        element: <AddStatus />,
      },
    ],
  },

  {
    path: "fault-orders",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DataGridFaultOrders />,
      },
      {
        path: "details/:id",
        element: <FaultOrderDetail />,
      },
      {
        path: "add-status",
        element: <AddStatusFaulOrders />,
      },
    ],
  },

  {
    path: "reporting-lists",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        //element: <DataGridFaultRepair />,
      },
    ],
  },

  {
    path: "daily-list",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        //element: <DataGridFaultRepair />,
      },
    ],
  },

  {
    path: "report-orders",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DataGridReportOrders />,
      },
      {
        path: "details/:id",
        element: <ReportOrderDetail />,
      },
    ],
  },

  {
    path: "configuration",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "configuration-grid",
        element: <DataGridConfiguration />,
      },
    ],
  },

  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
