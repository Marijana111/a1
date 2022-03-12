import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  LinearProgress,
} from "@mui/material";
import { spacing } from "@mui/system";
import { green, red } from "@mui/material/colors";

import Actions from "./Actions";
import Stats from "./Stats";
import Table from "./Table";
import { homeService } from "../../../Services/homeService";
import * as dateHelper from "../../../components/Config/DateHelper";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Default() {
  const { t } = useTranslation();
  const [requestsTodayTotal, setRequestsTodayTotal] = useState(0);
  const [requestsActive, setRequestsActive] = useState(0);
  const [faultOrdersTodayTotal, setFaultOrdersTodayTotal] = useState(0);
  const [faultOrdersActive, setFaultOrdersActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    homeService
      .getTodayRequests(dateHelper.formatUtcToDateApiNoTime(new Date()))
      .then((res) => {
        setRequestsTodayTotal(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    homeService
      .getRequestsActive()
      .then((res) => {
        setRequestsActive(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    homeService
      .getTodayFaultOrders(dateHelper.formatUtcToDateApiNoTime(new Date()))
      .then((res) => {
        setFaultOrdersTodayTotal(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    homeService
      .getFaultOrdersActive()
      .then((res) => {
        setFaultOrdersActive(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Naslovna" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Naslovna
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Zahtjevi danas"
            amount={isLoading ? <LinearProgress /> : requestsTodayTotal}
            chip="Danas"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Otvoreni zahtjevi"
            amount={isLoading ? <LinearProgress /> : requestsActive}
            percentagecolor={red[500]}
            illustration="/static/img/illustrations/waiting.png"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Smetnje danas"
            amount={isLoading ? <LinearProgress /> : faultOrdersTodayTotal}
            chip="Danas"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Aktivne smetnje"
            amount={isLoading ? <LinearProgress /> : faultOrdersActive}
            percentagecolor={red[500]}
            illustration="/static/img/illustrations/waiting.png"
          />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={12}>
          <Table />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Default;
