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
import "./operators.css";

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
  let filteredTypes = [];

  const [operatorDetails, setOperatorDetails] = useState({});
  const [possibleRequestTypes, setPossibleRequestTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    operatorsService
      .getOperatorByRef(operatorRef)
      .then((res) => {
        setOperatorDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    operatorsService
      .getRequestTypes()
      .then((res) => {
        setPossibleRequestTypes(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  filteredTypes = possibleRequestTypes.filter((el) => {
    return operatorDetails.operatorRequestTypes.some((f) => {
      return f.requestType.typeName !== el.requestTypeName;
    });
  });

  const setRequestTypeInputsEnabled = (typeName, checked) => {
    document.getElementById(typeName).disabled = !checked;
  };

  const setPossibleRequestTypeInputsEnabled = (typeName, checked) => {
    document.getElementById(typeName).disabled = !checked;
  };

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
                focusColor="black"
                name="name"
                label="Naziv"
                defaultValue={operatorDetails.operatorName}
                fullWidth
                variant="outlined"
                my={2}
              />
            </Grid>
            <Grid item md={5}>
              <CssTextField
                focusColor="black"
                name="oib"
                label="OIB"
                defaultValue={operatorDetails.operatorReferenceId}
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
                        key={type.requestType.typeId}
                        defaultChecked
                        onChange={(event) => {
                          setRequestTypeInputsEnabled(
                            type.requestType.typeName,
                            event.target.checked
                          );
                        }}
                        style={{ color: "#233044" }}
                        name={type.requestType.typeName}
                      />
                    }
                    label={type.requestType.typeDescription}
                  />
                  <fieldset id={type.requestType.typeName}>
                    <CssTextField
                      key={type.wholesaleAccount.sblAccountId}
                      focusColor="black"
                      defaultValue={type.wholesaleAccount.sblAccountId}
                      name="AccountId"
                      label="AccountId"
                      fullWidth
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      key={type.wholesaleAccount.sblBillingAccountId}
                      focusColor="black"
                      name="BillingAccountId"
                      label="BillingAccountId"
                      defaultValue={type.wholesaleAccount.sblBillingAccountId}
                      fullWidth
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      key={type.wholesaleAccount.sblBillingProfileId}
                      focusColor="black"
                      name="BillingProfileId"
                      label="BillingProfileId"
                      defaultValue={type.wholesaleAccount.sblBillingProfileId}
                      fullWidth
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      key={type.wholesaleAccount.sblBillingProfileName}
                      focusColor="black"
                      name="BillingProfileName"
                      label="BillingProfileName"
                      defaultValue={type.wholesaleAccount.sblBillingProfileName}
                      fullWidth
                      variant="outlined"
                      my={2}
                    />
                  </fieldset>
                </Grid>
              ))}
            {filteredTypes &&
              filteredTypes.map((filType) => {
                return (
                  <Grid item md={4}>
                    <FormControlLabel
                      control={
                        <StyledSwitch
                          key={filType.requestTypeId}
                          defaultChecked={false}
                          onChange={(event) => {
                            setPossibleRequestTypeInputsEnabled(
                              filType.requestTypeName,
                              event.target.checked
                            );
                          }}
                          style={{ color: "#233044" }}
                          name={filType.requestTypeName}
                        />
                      }
                      label={filType.requestTypeDescription}
                    />
                    <fieldset disabled id={filType.requestTypeName}>
                      <CssTextField
                        focusColor="black"
                        name="AccountId"
                        label="AccountId"
                        fullWidth
                        variant="outlined"
                        my={2}
                      />
                      <CssTextField
                        focusColor="black"
                        name="BillingAccountId"
                        label="BillingAccountId"
                        fullWidth
                        variant="outlined"
                        my={2}
                      />
                      <CssTextField
                        focusColor="black"
                        name="BillingProfileId"
                        label="BillingProfileId"
                        fullWidth
                        variant="outlined"
                        my={2}
                      />
                      <CssTextField
                        focusColor="black"
                        name="BillingProfileName"
                        label="BillingProfileName"
                        fullWidth
                        variant="outlined"
                        my={2}
                      />
                    </fieldset>
                  </Grid>
                );
              })}
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
                        defaultChecked
                        key={repType.report.reportId}
                        // checked={repType.report.reportId > 0 ? true : false}
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
          <br />
          <br />
          <Button type="submit" variant="contained" color="error" mt={3}>
            Spremi
          </Button>
          &nbsp; &nbsp;
          <Button
            onClick={() => navigate("/settings/operators")}
            style={{ backgroundColor: "black" }}
            type="button"
            variant="contained"
            mt={3}
          >
            Odustani
          </Button>
        </form>
      )}
    </>
  );
}

function RequestDetail() {
  return (
    <React.Fragment>
      <Helmet title="Uredi" />
      <Typography variant="h3" gutterBottom display="inline">
        Uredi operatora
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Typography>Postavke</Typography>
        <Link component={NavLink} to="/settings/operators">
          Operatori
        </Link>
        <Typography>Uredi operatora</Typography>
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
