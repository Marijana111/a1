import React from "react";

import async from "./components/Async";
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import AuthGuard from "./components/guards/AuthGuard";
import SignIn from "./pages/auth/SignIn";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";
import RequestDetail from "./pages/tables/Requests/RequestDetail";
import FaultOrderDetail from "./pages/tables/FaultOrders/FaultOrderDetail";
import ReportOrderDetail from "./pages/tables/ReportOrders/ReportOrderDetails";

const Default = async(() => import("./pages/dashboards/Default"));
const DataGridUsers = async(() =>
  import("./pages/tables/Settings/User/DataGridUsers")
);
const AddUser = async(() => import("./pages/tables/Settings/User/CreateUser"));
const UpdateUser = async(() =>
  import("./pages/tables/Settings/User/UpdateUser")
);
const UserDetails = async(() =>
  import("./pages/tables/Settings/User/UserDetails")
);
const DataGridOperators = async(() =>
  import("./pages/tables/Settings/Operators/DataGridOperators")
);
const AddOperator = async(() =>
  import("./pages/tables/Settings/Operators/AddOperator")
);
const UpdateOperator = async(() =>
  import("./pages/tables/Settings/Operators/UpdateOperator")
);
const OperatorDetails = async(() =>
  import("./pages/tables/Settings/Operators/OperatorDetails")
);

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
        element: <DataGridUsers />,
      },
      {
        path: "users/add-user",
        element: <AddUser />,
      },
      {
        path: "users/update-user/:userRef",
        element: <UpdateUser />,
      },
      {
        path: "users/details/:username",
        element: <UserDetails />,
      },
      {
        path: "operators",
        element: <DataGridOperators />,
      },
      {
        path: "operators/add-operator",
        element: <AddOperator />,
      },
      {
        path: "operators/update-operator/:ref",
        element: <UpdateOperator />,
      },
      {
        path: "operators/details/:ref",
        element: <OperatorDetails />,
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
