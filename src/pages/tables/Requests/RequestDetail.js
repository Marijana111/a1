import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import * as dateHelper from "../../../components/Config/DateHelper";
import AddIcon from "@mui/icons-material/Add";

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  Button,
} from "@mui/material";
import { spacing } from "@mui/system";
import { requestService } from "../../../Services/requestService";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  useAuthDispatch,
  logout,
  useAuthState,
} from "../../../components/Context";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const CustomTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background: #233044;
    color: ${(props) => props.theme.palette.common.white};
    padding: 5px;
    margin-top: 10px;
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    padding: 5px;
  }
`;

function EmptyCard() {
  const { state } = useLocation();
  const navigate = useNavigate();

  let requestId = state.requestId;

  const [requestDetails, setRequestDetails] = useState({});
  const [requestStatuses, setRequestStatuses] = useState([]);
  const [requestParams, setRequestParams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestService
      .getRequestById(requestId)
      .then((res) => {
        setRequestDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    requestService
      .getRequestByIdDetails(requestId)
      .then((res) => {
        setRequestParams(res.data.requestParams);
        setRequestStatuses(res.data.requestStatuses);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Card mb={6}>
          <CardContent>
            {requestDetails && (
              <Grid style={{ fontSize: "14px" }} container spacing={6}>
                <Grid item md={6}>
                  <div>
                    <b>Case Id:</b> {requestDetails.requestId}
                  </div>
                  <div>
                    <b>GUID:</b> {requestDetails.requestGuid}
                  </div>
                  <div>
                    <b>Naziv operatora:</b> {requestDetails.operatorName}
                  </div>
                  <div>
                    <b>Identifikator operatora:</b> {requestDetails.operatorRef}
                  </div>
                  <div>
                    <b>Vrsta zahtjeva:</b> {requestDetails.requestType}
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div>
                    <b>Kategorija:</b> {requestDetails.requestCategory}
                  </div>
                  <div>
                    <b>Vrijeme zahtjeva:</b>{" "}
                    {dateHelper.formatUtcToDate(
                      requestDetails.requestDateInsert
                    )}
                  </div>
                  <div>
                    <b>Adapter Id:</b> {requestDetails.adapterId}
                  </div>
                  <div>
                    <b>Status:</b> {requestDetails.statusName}
                  </div>
                </Grid>
              </Grid>
            )}
          </CardContent>
          <Divider />
          <CardContent>
            <Typography gutterBottom display="inline">
              <h3>Parametri zahtjeva</h3>
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Naziv</CustomTableCell>
                  <CustomTableCell>Vrijednost</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestParams.map((row) => (
                  <TableRow key={row.statusId}>
                    <CustomTableCell component="th" scope="row">
                      {row.parameterName}
                    </CustomTableCell>
                    <CustomTableCell>{row.parameterValue}</CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function RequestStatusCard() {
  let isAdmin;
  let isManager;
  const { state } = useLocation();
  const navigate = useNavigate();
  const userDetails = useAuthState();

  userDetails.roles.filter((r) => r === "Administrator").length > 0
    ? (isAdmin = true)
    : (isAdmin = false);

  userDetails.roles.filter((r) => r === "Back office upravitelj").length > 0
    ? (isManager = true)
    : (isManager = false);

  let requestId = state.requestId;

  const [requestDetails, setRequestDetails] = useState({});
  const [requestStatuses, setRequestStatuses] = useState([]);
  const [requestParams, setRequestParams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestService
      .getRequestById(requestId)
      .then((res) => {
        setRequestDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    requestService
      .getRequestByIdDetails(requestId)
      .then((res) => {
        setRequestParams(res.data.requestParams);
        setRequestStatuses(res.data.requestStatuses);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Card mb={6}>
          <CardContent>
            <Grid justifyContent="space-between" container spacing={10}>
              <Grid item>
                <Typography gutterBottom display="inline">
                  <h3>Statusi zahtjeva</h3>
                </Typography>
              </Grid>
              {isAdmin || isManager ? (
                <Grid item>
                  <Button
                    onClick={() =>
                      navigate(`/requests/add-status`, {
                        state: {
                          requestDetails: requestDetails,
                        },
                      })
                    }
                    variant="contained"
                    type="button"
                    color="error"
                    style={{ float: "right" }}
                  >
                    <AddIcon />
                    Dodaj status
                  </Button>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell>Status</CustomTableCell>
                <CustomTableCell align="right">Vrijeme</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestStatuses.map((row) => (
                <TableRow key={row.statusId}>
                  <CustomTableCell component="th" scope="row">
                    {row.statusType}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {dateHelper.formatUtcToDate(row.statusInsertDate)}
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </>
  );
}

function RequestDetail() {
  return (
    <React.Fragment>
      <Helmet title="Detalji" />
      <Typography variant="h3" gutterBottom display="inline">
        Detalji zahtjeva
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Link component={NavLink} to="/requests">
          Zahtjevi
        </Link>
        <Typography>Detalji</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EmptyCard />
          <RequestStatusCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default RequestDetail;
