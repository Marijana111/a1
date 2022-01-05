import React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import { Avatar, Paper, Typography } from "@mui/material";

import { ReactComponent as Logo } from "../../vendor/logo.svg";
import SignInComponent from "../../components/auth/SignIn";

const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

function SignIn() {
  return (
    <React.Fragment>
      {/* <img
      alt="logo"
        src="https://ssc.a1.hr/o/a1-theme/images/logo@2x.png"
        height="80px"
        width="80px"
      />
      <br /> */}
      {/* <Brand /> */}
      <Wrapper>
        <Helmet title="Sign In" />
        {/* <BigAvatar
          alt="Lucy"
          src="https://ssc.a1.hr/o/a1-theme/images/logo@2x.png"
        /> */}
        <img
          alt="logo"
          style={{ marginLeft: "40%", textAlign: "center" }}
          src="https://ssc.a1.hr/o/a1-theme/images/logo@2x.png"
          height="92px"
          width="92px"
        />

        {/* <Typography component="h1" variant="h4" align="center" gutterBottom>
          Welcome back, Lucy!
        </Typography> */}
        <Typography component="h2" variant="body1" align="center">
          Prijavite se za nastavak
        </Typography>

        <SignInComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default SignIn;
