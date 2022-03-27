import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

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
  const [isEnabledNNA, setIsEnabledNNA] = useState(false);
  const [isEnabledNND, setIsEnabledNND] = useState(false);
  const [isEnabledBSNA, setIsEnabledBSNA] = useState(false);
  const [isEnabledBSND, setIsEnabledBSND] = useState(false);
  const [isEnabledSNN, setIsEnabledSNN] = useState(false);
  const [isEnabledSBSN, setIsEnabledSBSN] = useState(false);
  const [requestTypes, setRequestTypes] = useState([]);

  useEffect(() => {
    operatorsService
      .getRequestTypes()
      .then((res) => {
        setRequestTypes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
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
                [DEMO] Uspješno ste dodali korisnika!
              </Alert>
            )}

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
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
                  <Grid item md={5}>
                    <CssTextField
                      focusColor="black"
                      name="oib"
                      label="OIB"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                  <Grid item md={4}>
                    <FormControlLabel
                      control={
                        <StyledSwitch
                          checked={isEnabledNNA}
                          onChange={(event) => {
                            setIsEnabledNNA(event.target.checked);
                          }}
                          style={{ color: "#233044" }}
                          name="NNA"
                        />
                      }
                      label="Najam niti aktivacija"
                    />
                    <br />
                    <CssTextField
                      disabled={isEnabledNNA ? false : true}
                      focusColor="black"
                      name="AccountId"
                      label="AccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledNNA ? false : true}
                      focusColor="black"
                      name="BillingAccountId"
                      label="BillingAccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledNNA ? false : true}
                      focusColor="black"
                      name="BillingProfileId"
                      label="BillingProfileId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledNNA ? false : true}
                      focusColor="black"
                      name="BillingProfileName"
                      label="BillingProfileName"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <FormControlLabel
                      control={
                        <StyledSwitch
                          checked={isEnabledNND}
                          onChange={(event) => {
                            setIsEnabledNND(event.target.checked);
                          }}
                          style={{ color: "#233044" }}
                          name="NND"
                        />
                      }
                      label="Najam niti deaktivacija"
                    />
                    <br />
                    <CssTextField
                      disabled={isEnabledNND ? false : true}
                      focusColor="black"
                      name="AccountId"
                      label="AccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledNND ? false : true}
                      focusColor="black"
                      name="BillingAccountId"
                      label="BillingAccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledNND ? false : true}
                      focusColor="black"
                      name="BillingProfileId"
                      label="BillingProfileId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledNND ? false : true}
                      focusColor="black"
                      name="BillingProfileName"
                      label="BillingProfileName"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <FormControlLabel
                      control={
                        <StyledSwitch
                          checked={isEnabledBSNA}
                          onChange={(event) => {
                            setIsEnabledBSNA(event.target.checked);
                          }}
                          style={{ color: "#233044" }}
                          name="BSNA"
                        />
                      }
                      label="Bitstream na niti aktivacija"
                    />
                    <br />
                    <CssTextField
                      disabled={isEnabledBSNA ? false : true}
                      focusColor="black"
                      name="AccountId"
                      label="AccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledBSNA ? false : true}
                      focusColor="black"
                      name="BillingAccountId"
                      label="BillingAccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledBSNA ? false : true}
                      focusColor="black"
                      name="BillingProfileId"
                      label="BillingProfileId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledBSNA ? false : true}
                      focusColor="black"
                      name="BillingProfileName"
                      label="BillingProfileName"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <FormControlLabel
                      control={
                        <StyledSwitch
                          checked={isEnabledBSND}
                          onChange={(event) => {
                            setIsEnabledBSND(event.target.checked);
                          }}
                          style={{ color: "#233044" }}
                          name="BSND"
                        />
                      }
                      label="Bitstream na niti deaktivacija"
                    />
                    <br />
                    <CssTextField
                      disabled={isEnabledBSND ? false : true}
                      focusColor="black"
                      name="AccountId"
                      label="AccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledBSND ? false : true}
                      focusColor="black"
                      name="BillingAccountId"
                      label="BillingAccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledBSND ? false : true}
                      focusColor="black"
                      name="BillingProfileId"
                      label="BillingProfileId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledBSND ? false : true}
                      focusColor="black"
                      name="BillingProfileName"
                      label="BillingProfileName"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <FormControlLabel
                      control={
                        <StyledSwitch
                          checked={isEnabledSNN}
                          onChange={(event) => {
                            setIsEnabledSNN(event.target.checked);
                          }}
                          style={{ color: "#233044" }}
                          name="SNN"
                        />
                      }
                      label="Smetnja na usluzi najam niti"
                    />
                    <br />
                    <CssTextField
                      disabled={isEnabledSNN ? false : true}
                      focusColor="black"
                      name="AccountId"
                      label="AccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledSNN ? false : true}
                      focusColor="black"
                      name="BillingAccountId"
                      label="BillingAccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledSNN ? false : true}
                      focusColor="black"
                      name="BillingProfileId"
                      label="BillingProfileId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledSNN ? false : true}
                      focusColor="black"
                      name="BillingProfileName"
                      label="BillingProfileName"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <FormControlLabel
                      control={
                        <StyledSwitch
                          checked={isEnabledSBSN}
                          onChange={(event) => {
                            setIsEnabledSBSN(event.target.checked);
                          }}
                          style={{ color: "#233044" }}
                          name="SBSN"
                        />
                      }
                      label="Smetnja na usluzi bitstream na niti"
                    />
                    <br />
                    <CssTextField
                      disabled={isEnabledSBSN ? false : true}
                      focusColor="black"
                      name="AccountId"
                      label="AccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledSBSN ? false : true}
                      focusColor="black"
                      name="BillingAccountId"
                      label="BillingAccountId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledSBSN ? false : true}
                      focusColor="black"
                      name="BillingProfileId"
                      label="BillingProfileId"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      disabled={isEnabledSBSN ? false : true}
                      focusColor="black"
                      name="BillingProfileName"
                      label="BillingProfileName"
                      //value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                  <Grid item md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          //   checked={gilad}
                          //   onChange={handleChange}
                          name="gilad"
                          style={{ color: "black" }}
                        />
                      }
                      label="Izvještaj o dostupnim adresama"
                      labelPlacement="bottom"
                    />
                  </Grid>
                  <Grid item md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          //   checked={gilad}
                          //   onChange={handleChange}
                          name="gilad"
                          style={{ color: "black" }}
                        />
                      }
                      label="Izvještaj o dostupnosti po adresi"
                      labelPlacement="bottom"
                    />
                  </Grid>
                  <Grid item md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          //   checked={gilad}
                          //   onChange={handleChange}
                          name="gilad"
                          style={{ color: "black" }}
                        />
                      }
                      label="Provjera statusa usluge po oznaci priključka"
                      labelPlacement="bottom"
                    />
                  </Grid>
                  <Grid item md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          //   checked={gilad}
                          //   onChange={handleChange}
                          name="gilad"
                          style={{ color: "black" }}
                        />
                      }
                      label="Izvještaj o slobodnim kapacitetima po distribucijskom čvoru"
                      labelPlacement="bottom"
                    />
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="error" mt={3}>
                  Spremi
                </Button>
                &nbsp; &nbsp;
                <Button
                  onClick={() => navigate("/home")}
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
