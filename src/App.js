import React from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { create } from "jss";
import { ThemeProvider } from "styled-components/macro";

import { StyledEngineProvider } from "@mui/styled-engine-sc";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StylesProvider from "@mui/styles/StylesProvider";
import jssPreset from "@mui/styles/jssPreset";

import "./i18n";
import createTheme from "./theme";
import routes from "./routes";

import useTheme from "./hooks/useTheme";
import { store } from "./redux/store";

//import { AuthProvider } from "./contexts/JWTContext";
import { THEMES } from "./constants";
// import { AuthProvider } from "./contexts/FirebaseAuthContext";
// import { AuthProvider } from "./contexts/Auth0Context";
// import { AuthProvider } from "./contexts/CognitoContext";
import { AuthProvider } from "./components/Context";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  const content = useRoutes(routes);

  const { theme } = useTheme();

  return (
    <HelmetProvider>
      <Helmet titleTemplate="A1 App" defaultTitle="A1 App" />
      <Provider store={store}>
        <StylesProvider jss={jss}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StyledEngineProvider injectFirst>
              <MuiThemeProvider theme={createTheme(THEMES.DEFAULT)}>
                <ThemeProvider theme={createTheme(THEMES.DEFAULT)}>
                  <AuthProvider>{content}</AuthProvider>
                </ThemeProvider>
              </MuiThemeProvider>
            </StyledEngineProvider>
          </LocalizationProvider>
        </StylesProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
