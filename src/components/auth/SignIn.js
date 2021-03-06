import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

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

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Unesite validan email.")
          .max(255)
          .required("Obavezno polje."),
        password: Yup.string().max(255).required("Obavezno polje."),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.email, values.password);

          navigate("/home");
        } catch (error) {
          const message = error.message || "Dogodila se greška.";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <CssTextField
            type="email"
            name="email"
            label="Email adresa"
            //value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
            focusColor="black"
          />
          <CssTextField
            type="password"
            name="password"
            label="Lozinka"
            //value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            focusColor="black"
            my={2}
          />
          {console.log("values", values)}
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                style={{
                  color: "#0c0c0d",
                }}
              />
            }
            label="Zapamti me"
          />
          <Button
            style={{ backgroundColor: "black", color: "white" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              values.email == "" || values.password == "" ? true : false
            }
          >
            Prijavi se
          </Button>
          <Button
            component={Link}
            //to="/auth/reset-password"
            to="#"
            fullWidth
            color="error"
          >
            Zaboravljena lozinka
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
