import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import * as dateHelper from "../../../components/Config/DateHelper";

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
} from "@mui/material";
import { spacing } from "@mui/system";
import { tableCellClasses } from "@mui/material/TableCell";
import { reportOrdersService } from "../../../Services/reportOrdersService";

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

  let reportId = state.reportId;

  const [reportOrderDetails, setReportOrderDetails] = useState({});
  const [reportParameters, setReportParameters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    reportOrdersService
      .getReportOrderById(reportId)
      .then((res) => {
        setReportOrderDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    reportOrdersService
      .getReportOrderByIdDetails(reportId)
      .then((res) => {
        setReportParameters(res.data.reportParams);
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
            {reportOrderDetails && (
              <Grid style={{ fontSize: "14px" }} container spacing={6}>
                <Grid item md={6}>
                  <div>
                    <b>Case Id:</b> {reportOrderDetails.reportId}
                  </div>
                  <div>
                    <b>GUID:</b> {reportOrderDetails.reportGuid}
                  </div>
                  <div>
                    <b>Naziv operatora:</b> {reportOrderDetails.operatorName}
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div>
                    <b>Identifikator operatora:</b>{" "}
                    {reportOrderDetails.operatorRef}
                  </div>
                  <div>
                    <b>Vrsta izvještaja:</b> {reportOrderDetails.reportType}
                  </div>
                  <div>
                    <b>Vrijeme izvještaja:</b>{" "}
                    {dateHelper.formatUtcToDate(
                      reportOrderDetails.reportDateInsert
                    )}
                  </div>
                </Grid>
              </Grid>
            )}
          </CardContent>
          <Divider />
          <CardContent>
            <Typography gutterBottom display="inline">
              <h3>Ulazni parametri</h3>
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Naziv</CustomTableCell>
                  <CustomTableCell>Vrijednost</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportParameters.map((row) =>
                  row.parameterDirection == "IN" ? (
                    <TableRow key={row.parameterName}>
                      <CustomTableCell component="th" scope="row">
                        {row.parameterDescription}
                      </CustomTableCell>
                      <CustomTableCell>{row.parameterValue}</CustomTableCell>
                    </TableRow>
                  ) : (
                    ""
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography gutterBottom display="inline">
              <h3>Izlazni parametri</h3>
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Naziv</CustomTableCell>
                  <CustomTableCell>Vrijednost</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportParameters.map((row) =>
                  row.parameterDirection == "OUT" ? (
                    <TableRow key={row.parameterDescription}>
                      <CustomTableCell component="th" scope="row">
                        {row.parameterDescription}
                      </CustomTableCell>
                      <CustomTableCell>{row.parameterValue}</CustomTableCell>
                    </TableRow>
                  ) : (
                    ""
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function ReportOrderDetail() {
  return (
    <React.Fragment>
      <Helmet title="Blank" />
      <Typography variant="h3" gutterBottom display="inline">
        Detalji izvještaja
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Link component={NavLink} to="/report-orders">
          Izvještaji
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

export default ReportOrderDetail;
