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
import {
  loginUser,
  useAuthState,
  useAuthDispatch,
} from "../../components/Context";
import Loading from "react-fullscreen-loading";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const [isLoading, setIsLoading] = React.useState(false);
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
    <>
      <Formik
        initialValues={{
          userName: "",
          password: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          userName: Yup.string().max(255).required("Obavezno polje."),
          password: Yup.string().max(255).required("Obavezno polje."),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setIsLoading(true);
          let password = values.password;
          let username = values.userName;
          try {
            setIsLoading(false);
            let response = await loginUser(dispatch, { password, username });
            if (response) {
              localStorage.setItem("userToken", response.jwttoken);
              navigate("/home");
            } else {
              navigate("/");
            }
          } catch (error) {
            navigate("/");
            console.log(error);
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
              type="text"
              name="userName"
              label="Korisničko ime"
              value={values.userName}
              error={Boolean(touched.userName && errors.userName)}
              fullWidth
              helperText={touched.userName && errors.userName}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              focusColor="black"
            />
            <CssTextField
              type="password"
              name="password"
              label="Lozinka"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              focusColor="black"
              my={2}
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
          </form>
        )}
      </Formik>
      <Loading
        loading={isLoading}
        background="rgba(60, 60, 60, 0.5)"
        loaderColor="#d71920"
      />
    </>
  );
}

export default SignIn;
