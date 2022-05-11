import React, { useState } from "react";
import styled from "styled-components/macro";
import { Outlet } from "react-router-dom";

import { Hidden, CssBaseline, Paper as MuiPaper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";

import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/Footer";
import { Sliders, Archive } from "react-feather";
import ErrorIcon from "@mui/icons-material/Error";
import TableChartIcon from "@mui/icons-material/TableChart";
import { ListAlt, Settings } from "@mui/icons-material";
import {
  useAuthDispatch,
  logout,
  useAuthState,
} from "../../src/components/Context";

const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children }) => {
  let isAdmin;
  let navItems;
  const userDetails = useAuthState();
  const [mobileOpen, setMobileOpen] = useState(false);

  userDetails.roles.filter((r) => r === "Administrator").length > 0
    ? (isAdmin = true)
    : (isAdmin = false);

  const pagesSectionForAdmin = [
    {
      href: "/home",
      icon: Sliders,
      title: "Naslovna",
    },
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

  const pagesSectionNotAdmin = [
    {
      href: "/home",
      icon: Sliders,
      title: "Naslovna",
    },
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
  ];

  if (isAdmin == true) {
    navItems = [
      {
        title: "Pages",
        pages: pagesSectionForAdmin,
      },
    ];
  } else {
    navItems = [
      {
        title: "Pages",
        pages: pagesSectionNotAdmin,
      },
    ];
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Hidden lgUp implementation="js">
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            items={navItems}
          />
        </Hidden>
        <Hidden mdDown implementation="css">
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            items={navItems}
          />
        </Hidden>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isLgUp ? 12 : 5}>
          {children}
          <Outlet />
        </MainContent>
        <Footer />
      </AppContent>
    </Root>
  );
};

export default Dashboard;
