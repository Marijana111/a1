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
import { tableCellClasses } from "@mui/material/TableCell";
import { faultOrdersService } from "../../../Services/faultOrdersService";

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

  const [faultOrderDetails, setFaultOrderDetails] = useState({});
  const [faultOrderStatuses, setFaultOrderStatuses] = useState([]);
  const [faultOrderParams, setFaultOrderParams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    faultOrdersService
      .getFaultOrderById(requestId)
      .then((res) => {
        setFaultOrderDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    faultOrdersService
      .getFaultOrderByIdDetails(requestId)
      .then((res) => {
        setFaultOrderParams(res.data.requestParams);
        setFaultOrderStatuses(res.data.requestStatuses);
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
            {faultOrderDetails && (
              <Grid style={{ fontSize: "14px" }} container spacing={6}>
                <Grid item md={6}>
                  <div>
                    <b>Case Id:</b> {faultOrderDetails.requestId}
                  </div>
                  <div>
                    <b>GUID:</b> {faultOrderDetails.requestGuid}
                  </div>
                  <div>
                    <b>Naziv operatora:</b> {faultOrderDetails.operatorName}
                  </div>
                  <div>
                    <b>Identifikator operatora:</b>{" "}
                    {faultOrderDetails.operatorRef}
                  </div>
                  <div>
                    <b>Vrsta smetnje:</b> {faultOrderDetails.requestType}
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div>
                    <b>Kategorija:</b> {faultOrderDetails.requestCategory}
                  </div>
                  <div>
                    <b>Vrijeme smetnje:</b>{" "}
                    {dateHelper.formatUtcToDate(
                      faultOrderDetails.requestDateInsert
                    )}
                  </div>
                  <div>
                    <b>Adapter Id:</b> {faultOrderDetails.adapterId}
                  </div>
                  <div>
                    <b>Status:</b> {faultOrderDetails.statusName}
                  </div>
                </Grid>
              </Grid>
            )}
          </CardContent>
          <Divider />
          <CardContent>
            <Typography gutterBottom display="inline">
              <h3>Parametri smetnje</h3>
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Naziv</CustomTableCell>
                  <CustomTableCell>Oznaka</CustomTableCell>
                  <CustomTableCell>Vrijednost</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {faultOrderParams.map((row) => (
                  <TableRow key={row.parameterName}>
                    <CustomTableCell component="th" scope="row">
                      {row.parameterName}
                    </CustomTableCell>
                    <CustomTableCell>{row.parameterRef}</CustomTableCell>
                    <CustomTableCell>{row.parameterValue}</CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <Divider />
          <CardContent>
            <Grid justifyContent="space-between" container spacing={10}>
              <Grid item>
                <Typography gutterBottom display="inline">
                  <h3>Statusi smetnje</h3>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() =>
                    navigate(`/fault-orders/add-status`, {
                      state: {
                        faultOrderDetails: faultOrderDetails,
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
            </Grid>
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Status</CustomTableCell>
                  <CustomTableCell>Opis</CustomTableCell>
                  <CustomTableCell>Vrijeme</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {faultOrderStatuses.map((row) => (
                  <TableRow key={row.statusId}>
                    <CustomTableCell component="th" scope="row">
                      {row.statusRef}
                    </CustomTableCell>
                    <CustomTableCell>{row.statusHref}</CustomTableCell>
                    <CustomTableCell>
                      {dateHelper.formatUtcToDate(row.statusInsertDate)}
                    </CustomTableCell>
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

function FaultOrderDetail() {
  return (
    <React.Fragment>
      <Helmet title="Detalji" />
      <Typography variant="h3" gutterBottom display="inline">
        Detalji smetnje
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Link component={NavLink} to="/fault-orders">
          Smetnje
        </Link>
        <Typography>Detalji</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EmptyCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default FaultOrderDetail;
