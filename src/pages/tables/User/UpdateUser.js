import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";

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
} from "@mui/material";
import { spacing } from "@mui/system";
import { userService } from "../../../Services/userService";

const UpdateUser = () => {
  const { state } = useLocation();

  let userID = state.userID;

  const [user, setUser] = useState({});

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
    fullName: user.name,
    email: user.email,
    password: user.phone,
    confirmPassword: user.phone,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Obavezno polje!"),
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

  useEffect(() => {
    userService
      .getUserById(userID)
      .then((res) => {
        console.log("resById", res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <React.Fragment>
      <Helmet title="Formik" />
      <Typography variant="h3" gutterBottom display="inline">
        Uredi korisnika
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Naslovnica
        </Link>
        <Link component={NavLink} to="/users">
          Korisnici
        </Link>
        <Typography>Uredi korisnika</Typography>
      </Breadcrumbs>

      <Divider my={6} />
      {user && (
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
                    [DEMO] Uspješno ste uredili korisnika!
                  </Alert>
                )}
                {isSubmitting ? (
                  <Box display="flex" justifyContent="center" my={6}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <CssTextField
                      focusColor="black"
                      name="fullName"
                      label="Ime i prezime"
                      value={values.fullName}
                      defaultValue={user.name}
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth
                      helperText={touched.firstName && errors.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      focusColor="black"
                      name="email"
                      label="Email"
                      value={values.email}
                      defaultValue={user.email}
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      focusColor="black"
                      name="password"
                      label="Lozinka"
                      defaultValue={user.phone}
                      value={values.password}
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      variant="outlined"
                      my={2}
                    />
                    <CssTextField
                      focusColor="black"
                      name="confirmPassword"
                      label="Potvrdi lozinku"
                      value={values.confirmPassword}
                      defaultValue={user.phone}
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                      fullWidth
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      variant="outlined"
                      my={2}
                    />
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
                      onClick={() => navigate("/tables/data-grid")}
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
      )}
    </React.Fragment>
  );
};

export default UpdateUser;
