import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import {
  Alert as MuiAlert,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
  FormControlLabel,
  Switch,
  Checkbox,
} from "@mui/material";
import { spacing } from "@mui/system";
import { pink } from "@mui/material/colors";
import { operatorsService } from "../../../../Services/operatorsService";
import "./operators.css";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

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

function BasicForm() {
  const { register, handleSubmit, errors, control, formState, setValue } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
    });

  const navigate = useNavigate();
  const [isEnabledNNA, setIsEnabledNNA] = useState(false);
  const [isEnabledNND, setIsEnabledNND] = useState(false);
  const [isEnabledBSNA, setIsEnabledBSNA] = useState(false);
  const [isEnabledBSND, setIsEnabledBSND] = useState(false);
  const [isEnabledSNN, setIsEnabledSNN] = useState(false);
  const [isEnabledSBSN, setIsEnabledSBSN] = useState(false);
  const [requestTypes, setRequestTypes] = useState([{}]);

  useEffect(() => {
    operatorsService
      .getRequestTypes()
      .then((res) => {
        setRequestTypes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (data) => {
    console.log("dataCreate", data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
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
            {...register("name")}
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
            {...register("oib")}
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
        <Grid container justify="center" md={3}>
          <FormControlLabel
            style={{ marginLeft: "25px" }}
            centered
            component
            control={
              <StyledSwitch
                //checked={isEnabledNNA}
                onClick={(event) => {
                  setIsEnabledNNA(event.target.checked);
                }}
                style={{ color: "#233044" }}
                name="typeNNA"
                {...register("typeNNA")}
              />
            }
            label="Najam niti aktivacija"
          />
        </Grid>
        <Grid item md={3}>
          <input
            className="inputNonDisplay"
            value={"0b0c9dbf-bfbb-4abc-bb32-caa85e44d220"}
            type="text"
            {...register("NNAtypeRef")}
          />
          <CssTextField
            disabled={isEnabledNNA ? false : true}
            focusColor="black"
            name="NNAAccountId"
            label="AccountId"
            {...register("NNAAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledNNA ? false : true}
            focusColor="black"
            name="NNABillingAccountId"
            label="BillingAccountId"
            {...register("NNABillingAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledNNA ? false : true}
            focusColor="black"
            name="NNABillingProfileId"
            label="BillingProfileId"
            {...register("NNABillingProfileId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledNNA ? false : true}
            focusColor="black"
            name="NNABillingProfileName"
            label="BillingProfileName"
            {...register("NNABillingProfileName")}
            fullWidth
            variant="outlined"
            my={2}
          />
        </Grid>
        <Grid container justify="center" md={3}>
          <FormControlLabel
            style={{ marginLeft: "25px" }}
            centered
            component
            control={
              <StyledSwitch
                //checked={isEnabledNND}
                onClick={(event) => {
                  setIsEnabledNND(event.target.checked);
                }}
                style={{ color: "#233044" }}
                name="typeNND"
                {...register("typeNND")}
              />
            }
            label="Najam niti deaktivacija"
          />
        </Grid>
        <Grid item md={3}>
          <input
            className="inputNonDisplay"
            value={"1e126157-f22e-49de-a730-2f34ae52b9e2"}
            type="text"
            {...register("NNDtypeRef")}
          />
          <CssTextField
            disabled={isEnabledNND ? false : true}
            focusColor="black"
            name="NNDAccountId"
            label="AccountId"
            {...register("NNDAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledNND ? false : true}
            focusColor="black"
            name="NNDBillingAccountId"
            label="BillingAccountId"
            {...register("NNDBillingAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledNND ? false : true}
            focusColor="black"
            name="BillingProfileId"
            label="BillingProfileId"
            {...register("NNDBillingProfileId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledNND ? false : true}
            focusColor="black"
            name="NNDBillingProfileName"
            label="BillingProfileName"
            {...register("NNDBillingProfileName")}
            fullWidth
            variant="outlined"
            my={2}
          />
        </Grid>
        <Grid container justify="center" md={3}>
          <FormControlLabel
            style={{ marginLeft: "25px" }}
            centered
            component
            control={
              <StyledSwitch
                //checked={isEnabledBSNA}
                onClick={(event) => {
                  setIsEnabledBSNA(event.target.checked);
                }}
                style={{ color: "#233044" }}
                name="typeBSNA"
                {...register("typeBSNA")}
              />
            }
            label="Bitstream na niti aktivacija"
          />
        </Grid>
        <Grid item md={3}>
          <input
            className="inputNonDisplay"
            value={"f6927acd-a9df-47bd-ab39-584840f2b256"}
            type="text"
            {...register("BSNAtypeRef")}
          />
          <CssTextField
            disabled={isEnabledBSNA ? false : true}
            focusColor="black"
            name="BSNAAccountId"
            label="AccountId"
            {...register("BSNAAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledBSNA ? false : true}
            focusColor="black"
            name="BSNABillingAccountId"
            label="BillingAccountId"
            {...register("BSNABillingAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledBSNA ? false : true}
            focusColor="black"
            name="BSNABillingProfileId"
            label="BillingProfileId"
            {...register("BSNABillingProfileId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledBSNA ? false : true}
            focusColor="black"
            name="BSNABillingProfileName"
            label="BillingProfileName"
            {...register("BSNABillingProfileName")}
            fullWidth
            variant="outlined"
            my={2}
          />
        </Grid>
        <Grid container justify="center" md={3}>
          <FormControlLabel
            style={{ marginLeft: "25px" }}
            centered
            component
            control={
              <StyledSwitch
                //checked={isEnabledBSND}
                onClick={(event) => {
                  setIsEnabledBSND(event.target.checked);
                }}
                style={{ color: "#233044" }}
                name="typeBSND"
                {...register("typeBSND")}
              />
            }
            label="Bitstream na niti deaktivacija"
          />
        </Grid>
        <Grid item md={3}>
          <input
            className="inputNonDisplay"
            value={"ab67a847-eaf1-441d-bb28-6b3f3dbb43eb"}
            type="text"
            {...register("BSNDtypeRef")}
          />
          <CssTextField
            disabled={isEnabledBSND ? false : true}
            focusColor="black"
            name="BSNDAccountId"
            label="AccountId"
            {...register("BSNDAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledBSND ? false : true}
            focusColor="black"
            name="BSNDBillingAccountId"
            label="BillingAccountId"
            {...register("BSNDBillingAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledBSND ? false : true}
            focusColor="black"
            name="BSNDBillingProfileId"
            label="BillingProfileId"
            {...register("BSNDBillingProfileId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledBSND ? false : true}
            focusColor="black"
            name="BSNDBillingProfileName"
            label="BillingProfileName"
            {...register("BSNDBillingProfileName")}
            fullWidth
            variant="outlined"
            my={2}
          />
        </Grid>
        <Grid container justify="center" md={3}>
          <FormControlLabel
            style={{ marginLeft: "25px" }}
            centered
            component
            control={
              <StyledSwitch
                //checked={isEnabledSNN}
                onClick={(event) => {
                  setIsEnabledSNN(event.target.checked);
                }}
                style={{ color: "#233044" }}
                name="typeSNN"
                {...register("typeSNN")}
              />
            }
            label="Smetnja na usluzi najam niti"
          />
        </Grid>
        <Grid item md={3}>
          <input
            className="inputNonDisplay"
            value={"b74aa635-dd7a-455d-980c-853fc582b79d"}
            type="text"
            {...register("SNNtypeRef")}
          />
          <CssTextField
            disabled={isEnabledSNN ? false : true}
            focusColor="black"
            name="SNNAccountId"
            label="AccountId"
            {...register("SNNAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledSNN ? false : true}
            focusColor="black"
            name="BillingAccountId"
            label="BillingAccountId"
            {...register("SNNBillingAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledSNN ? false : true}
            focusColor="black"
            name="SNNBillingProfileId"
            label="BillingProfileId"
            {...register("SNNBillingProfileId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledSNN ? false : true}
            focusColor="black"
            name="SNNBillingProfileName"
            label="BillingProfileName"
            {...register("SNNBillingProfileName")}
            fullWidth
            variant="outlined"
            my={2}
          />
        </Grid>
        <Grid container justify="center" md={3}>
          <FormControlLabel
            style={{ marginLeft: "25px" }}
            centered
            component
            control={
              <StyledSwitch
                //checked={isEnabledSBSN}
                onClick={(event) => {
                  setIsEnabledSBSN(event.target.checked);
                }}
                style={{ color: "#233044" }}
                name="typeSBSN"
                {...register("typeSBSN")}
              />
            }
            label="Smetnja na usluzi bitstream na niti"
          />
        </Grid>
        <Grid item md={3}>
          <input
            className="inputNonDisplay"
            value={"a358236e-6cb9-48d1-84a9-53621ce7a7de"}
            type="text"
            {...register("SBSNtypeRef")}
          />
          <CssTextField
            disabled={isEnabledSBSN ? false : true}
            focusColor="black"
            name="SBSNAccountId"
            label="AccountId"
            {...register("SBSNAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledSBSN ? false : true}
            focusColor="black"
            name="SBSNBillingAccountId"
            label="BillingAccountId"
            {...register("SBSNBillingAccountId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledSBSN ? false : true}
            focusColor="black"
            name="SBSNBillingProfileId"
            label="BillingProfileId"
            {...register("SBSNBillingProfileId")}
            fullWidth
            variant="outlined"
            my={2}
          />
          <CssTextField
            disabled={isEnabledSBSN ? false : true}
            focusColor="black"
            name="SBSNBillingProfileName"
            label="BillingProfileName"
            {...register("SBSNBillingProfileName")}
            fullWidth
            variant="outlined"
            my={2}
          />
        </Grid>
        <Grid item md={12}>
          <h4>
            <strong>Izvještaji</strong>
          </h4>
          <Divider />
        </Grid>
        <Grid item md={6}>
          <FormControlLabel
            control={
              <Checkbox
                //   checked={gilad}
                //   onChange={handleChange}
                value={"10"}
                name="report10"
                style={{ color: "black" }}
                {...register("report10")}
              />
            }
            label="Izvještaj o dostupnim adresama"
          />
        </Grid>
        <Grid item md={6}>
          <FormControlLabel
            control={
              <Checkbox
                //   checked={gilad}
                //   onChange={handleChange}
                value={"11"}
                name="report11"
                style={{ color: "black" }}
                {...register("report11")}
              />
            }
            label="Izvještaj o dostupnosti po adresi"
          />
        </Grid>
        <Grid item md={6}>
          <FormControlLabel
            control={
              <Checkbox
                //   checked={gilad}
                //   onChange={handleChange}
                value={"12"}
                name="report12"
                style={{ color: "black" }}
                {...register("report12")}
              />
            }
            label="Provjera statusa usluge po oznaci priključka"
          />
        </Grid>
        <Grid item md={6}>
          <FormControlLabel
            control={
              <Checkbox
                //   checked={gilad}
                //   onChange={handleChange}
                value={"13"}
                name="report13"
                style={{ color: "black" }}
                {...register("report13")}
              />
            }
            label="Izvještaj o slobodnim kapacitetima po distribucijskom čvoru"
          />
        </Grid>
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
  );
}

function FormikPage() {
  return (
    <React.Fragment>
      <Helmet title="Novi operator" />
      <Typography variant="h3" gutterBottom display="inline">
        Novi operator
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Naslovnica
        </Link>
        <Typography>Postavke</Typography>
        <Link component={NavLink} to="/settings/operators">
          Operatori
        </Link>
        <Typography>Novi operator</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <BasicForm />
    </React.Fragment>
  );
}

export default FormikPage;
