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
  let arrayRoles = [];
  const userDetails = useAuthState();

  const nameOfUser = localStorage.getItem("currentUserName");
  const rolesOfUser = localStorage.getItem("currentUserRoles");
  arrayRoles.push(rolesOfUser);

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
            {!!nameOfUser && (
              <Avatar
                alt={nameOfUser}
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                // {user.avatar}
              />
            )}
          </FooterBadge>
        </Grid>
        <Grid item>
          {!!nameOfUser && (
            <FooterText variant="body2">{nameOfUser}</FooterText>
          )}
          {!nameOfUser && <FooterText variant="body2">{nameOfUser}</FooterText>}
          <FooterSubText variant="caption">
            {arrayRoles &&
              arrayRoles.map((role, i, arr) => (
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
