import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
  LinearProgress,
  Button,
  FormControlLabel,
  Switch,
  Checkbox,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { operatorsService } from "../../../../Services/operatorsService";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TextField = styled(MuiTextField)(spacing);

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focusColor,
    },
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#0a93f2",
  },
}));

function EmptyCard() {
  const { state } = useLocation();
  const navigate = useNavigate();

  let operatorRef = state.operatorRef;

  const [operatorDetails, setOperatorDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    operatorsService
      .getOperatorByRef(operatorRef)
      .then((res) => {
        setOperatorDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <form>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <h4>
                <strong>Operator</strong>
              </h4>
              <Divider />
            </Grid>
            <Grid item md={5}>
              <CssTextField
                disabled
                focusColor="black"
                name="name"
                label="Naziv"
                value={operatorDetails.operatorName}
                fullWidth
                variant="outlined"
                my={2}
              />
            </Grid>
            <Grid item md={5}>
              <CssTextField
                disabled
                focusColor="black"
                name="oib"
                label="OIB"
                value={operatorDetails.operatorReferenceId}
                fullWidth
                variant="outlined"
                my={2}
              />
            </Grid>
            <Grid item md={12}>
              <h4>
                <strong>Zahtjevi</strong>
              </h4>
              <Divider />
            </Grid>
            {operatorDetails &&
              operatorDetails.operatorRequestTypes.map((type) => (
                <Grid item md={4}>
                  <FormControlLabel
                    control={
                      <StyledSwitch
                        checked={type.requestType.typeId > 0 ? true : false}
                        style={{ color: "#233044" }}
                        name={type.requestType.typeName}
                      />
                    }
                    label={type.requestType.typeDescription}
                  />
                  <CssTextField
                    disabled
                    focusColor="black"
                    value={type.wholesaleAccount.sblAccountId}
                    name="AccountId"
                    label="AccountId"
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                  <CssTextField
                    disabled
                    focusColor="black"
                    name="BillingAccountId"
                    label="BillingAccountId"
                    value={type.wholesaleAccount.sblBillingAccountId}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                  <CssTextField
                    disabled
                    focusColor="black"
                    name="BillingProfileId"
                    label="BillingProfileId"
                    value={type.wholesaleAccount.sblBillingProfileId}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                  <CssTextField
                    disabled
                    focusColor="black"
                    name="BillingProfileName"
                    label="BillingProfileName"
                    value={type.wholesaleAccount.sblBillingProfileName}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                </Grid>
              ))}
            <Grid item md={12}>
              <h4>
                <strong>Izvještaji</strong>
              </h4>
              <Divider />
            </Grid>
            {operatorDetails &&
              operatorDetails.operatorReportTypes.map((repType) => (
                <Grid item md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={repType.report.reportId > 0 ? true : false}
                        name="gilad"
                        style={{ color: "black" }}
                      />
                    }
                    label={repType.report.reportName}
                    labelPlacement="bottom"
                  />
                </Grid>
              ))}
          </Grid>
        </form>
      )}
    </>
  );
}

function RequestDetail() {
  return (
    <React.Fragment>
      <Helmet title="Detalji" />
      <Typography variant="h3" gutterBottom display="inline">
        Detalji operatora
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Typography>Postavke</Typography>
        <Link component={NavLink} to="/settings/operators">
          Operatori
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

export default RequestDetail;
