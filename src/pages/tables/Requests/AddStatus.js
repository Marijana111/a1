import React, { useState } from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

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
  MenuItem,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DatePicker, DateTimePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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

const initialValues = {
  firstName: "Lucy",
  lastName: "Lavender",
  email: "lucylavender@gmail.com",
  password: "mypassword123",
  confirmPassword: "mypassword123",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Obavezno polje!"),
  lastName: Yup.string().required("Obavezno polje!"),
  email: Yup.string()
    .email("Unesite validan email.")
    .required("Obavezno polje!"),
  password: Yup.string()
    .min(12, "Minimalno 12 znakova.")
    .max(255)
    .required("Obavezno polje!"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Lozinke trebaju biti iste."
    ),
  }),
});

function BasicForm() {
  const { state } = useLocation();
  const [operatorValue, setOperatorValue] = useState(null);
  const [valueDateFrom, setValueDateFrom] = useState(new Date());
  const [counter, setCounter] = useState(0);
  const [locale, setLocale] = useState("fr");

  const optionsStatus = [
    { value: "PRIHVAĆEN", name: "PRIHVAĆEN" },
    { value: "REALIZIRAN", name: "REALIZIRAN" },
    { value: "ODBIJEN", name: "ODBIJEN" },
    { value: "STORNO", name: "STORNO" },
    { value: "INFO", name: "INFO" },
    { value: "REALIZIRAN_OK", name: "REALIZIRAN_OK" },
    { value: "REALIZIRAN_NOK", name: "REALIZIRAN_NOK" },
  ];

  const optionsDescription = [
    { value: "Opis 1", name: "Opis 1" },
    { value: "Opis 2", name: "Opis 2" },
  ];

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await timeOut(1500);
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  return (
    <>
      <Card mb={6}>
        <CardContent>
          {state.requestDetails && (
            <Grid container spacing={6}>
              <Grid item md={6}>
                <div>
                  <b>GUID:</b> {state.requestDetails.requestGuid}
                </div>
                <div>
                  <b>Naziv operatora:</b> {state.requestDetails.operatorName}
                </div>
                <div>
                  <b>Identifikator operatora:</b>{" "}
                  {state.requestDetails.operatorRef}
                </div>
                <div>
                  <b>Vrsta zahtjeva:</b> {state.requestDetails.requestType}
                </div>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          status,
        }) => (
          <Card mb={6}>
            <CardContent>
              {status && status.sent && (
                <Alert severity="success" my={3}>
                  [DEMO] Uspješno ste dodali status!
                </Alert>
              )}

              {isSubmitting ? (
                <Box display="flex" justifyContent="center" my={6}>
                  <CircularProgress />
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Grid item>
                    <Typography gutterBottom display="inline">
                      <h3>Status zahtjeva</h3>
                    </Typography>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item md={3}>
                      <CssTextField
                        focusColor="black"
                        name="status"
                        label="Status"
                        value={operatorValue}
                        //error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        onChange={(event) => {
                          setOperatorValue(event.target.value);
                        }}
                        variant="outlined"
                        select
                      >
                        {optionsStatus.map((status) => (
                          <MenuItem key={status.value} value={status.name}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </Grid>
                    <Grid item md={3}>
                      <CssTextField
                        focusColor="black"
                        name="description"
                        label="Opis"
                        value={operatorValue}
                        //error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        onChange={(event) => {
                          setOperatorValue(event.target.value);
                        }}
                        variant="outlined"
                        select
                      >
                        {optionsDescription.map((status) => (
                          <MenuItem key={status.value} value={status.name}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </Grid>
                    <Grid item md={3}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          label="Datum"
                          inputFormat="dd.MM.yyyy. hh:mm:ss"
                          fullWidth
                          ampm={false}
                          ampmInClock={false}
                          value={valueDateFrom}
                          ampm
                          onChange={(newValue) => {
                            setValueDateFrom(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Divider style={{ marginTop: "20px" }} />
                  <Grid item>
                    <Typography gutterBottom display="inline">
                      <h3>Parametri zahtjeva</h3>
                    </Typography>
                  </Grid>
                  <Grid container spacing={6}>
                    <Grid item md={4}>
                      <CssTextField
                        focusColor="black"
                        name="name"
                        label="Naziv"
                        //value={values.firstName}
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <CssTextField
                        focusColor="black"
                        name="value"
                        label="Vrijednost"
                        //value={values.firstName}
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={2}>
                      <Button
                        onClick={handleClick}
                        variant="contained"
                        type="button"
                        color="error"
                        style={{ marginTop: "14px" }}
                      >
                        <AddIcon />
                        Dodaj
                      </Button>
                    </Grid>
                    {Array.from(Array(counter)).map((c, index) => {
                      return (
                        <>
                          <Grid
                            style={{ marginLeft: "1px" }}
                            container
                            spacing={6}
                          >
                            <Grid item md={4}>
                              <CssTextField
                                focusColor="black"
                                name="name"
                                label="Naziv"
                                //value={values.firstName}
                                error={Boolean(
                                  touched.firstName && errors.firstName
                                )}
                                fullWidth
                                helperText={
                                  touched.firstName && errors.firstName
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                                variant="outlined"
                                my={2}
                              />
                            </Grid>
                            <Grid item md={4}>
                              <CssTextField
                                focusColor="black"
                                name="value"
                                label="Vrijednost"
                                //value={values.firstName}
                                error={Boolean(
                                  touched.firstName && errors.firstName
                                )}
                                fullWidth
                                helperText={
                                  touched.firstName && errors.firstName
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                                variant="outlined"
                                my={2}
                              />
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    mt={3}
                  >
                    Spremi
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    onClick={() => navigate("/requests")}
                    style={{ backgroundColor: "black" }}
                    type="button"
                    variant="contained"
                    mt={3}
                  >
                    Odustani
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </Formik>
    </>
  );
}

function FormikPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Helmet title="Formik" />
      <Typography variant="h3" gutterBottom display="inline">
        Status
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Link component={NavLink} to="/requests">
          Zahtjevi
        </Link>
        {/* <Link component={NavLink} to={() => navigate.goBack()}>
          Detalji 
        </Link> */}
        <Typography>Status</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <BasicForm />
    </React.Fragment>
  );
}

export default FormikPage;
