import React from "react";
import styled from "styled-components/macro";

import { Badge, Grid, Avatar, Typography } from "@mui/material";

import { useAuthDispatch, logout, useAuthState } from "../Context";

const Footer = styled.div`
  background-color: ${(props) =>
    props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)}
    ${(props) => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const FooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const FooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`;

const FooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)};
  span {
    background-color: ${(props) =>
      props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

const SidebarFooter = ({ ...rest }) => {
  const userDetails = useAuthState();

  return (
    <Footer {...rest}>
      <Grid container spacing={2}>
        <Grid item>
          <FooterBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            {!!userDetails && (
              <Avatar
                alt={userDetails.username}
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                // {user.avatar}
              />
            )}
            {!userDetails && (
              <Avatar
                alt="Lucy Lavender"
                src="https://tellmetrip.com/img/no-user.png"
              />
            )}
          </FooterBadge>
        </Grid>
        <Grid item>
          {!!userDetails && (
            <FooterText variant="body2">
              {userDetails.firstName + " " + userDetails.lastName}
            </FooterText>
          )}
          {!userDetails && (
            <FooterText variant="body2">
              {userDetails.firstName + " " + userDetails.lastName}
            </FooterText>
          )}
          <FooterSubText variant="caption">
            {userDetails.roles &&
              userDetails.roles.map((role, i, arr) => (
                <span style={{ fontSize: "8px" }}>
                  {role} {i != arr.length - 1 ? ", " : ""}
                </span>
              ))}
          </FooterSubText>
        </Grid>
      </Grid>
    </Footer>
  );
};

export default SidebarFooter;
