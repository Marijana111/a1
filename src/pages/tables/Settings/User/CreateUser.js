import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  Alert as MuiAlert,
  AlertTitle,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
  TextField,
  LinearProgress,
  Button,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import { spacing } from "@mui/system";
import { userService } from "../../../../Services/userService";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  CheckCircleOutline,
  ErrorOutline,
} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Alert = styled(MuiAlert)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

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

function EmptyCard() {
  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("Obavezno polje!"),
    lastName: Yup.string().required("Obavezno polje!"),
    email: Yup.string()
      .required("Obavezno polje!")
      .email("Unesite validan email."),
    username: Yup.string().required("Obavezno polje!"),
    password: Yup.string()
      .required("Obavezno polje!")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Unesite ispravan format."
      ),
    confirmPassword: Yup.string()
      .required("Obavezno polje!")
      .oneOf([Yup.ref("password")], "Lozinke nisu iste."),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const { register, handleSubmit, reset, formState } = useForm(validationOpt);

  const { errors } = formState;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [valueRole, setValueRole] = useState("");

  const handleChangeRole = (event) => {
    setValueRole(event.target.value);
  };

  const submit = (data) => {
    let role = [];

    if (data.roleAdmin == true) {
      role.push("Administrator");
    }

    if (valueRole !== "") {
      role.push(valueRole);
    }

    setIsLoading(true);
    userService
      .createUser(
        data.email,
        data.password,
        role,
        data.username,
        data.firstName,
        data.lastName
      )
      .then((res) => {
        if (res.status == 200) {
          setIsSuccessfull(true);
        } else if (res.status !== 200) {
          setIsSuccessfull(false);
          setErrorMessage(res.statusText);
        }
        setIsLoading(false);
        setOpenDialog(true);
      })
      .catch((err) => console.log(err));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/settings/users");
  };

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Card mb={6}>
          <CardContent>
            <form style={{ marginTop: "20px" }} onSubmit={handleSubmit(submit)}>
              <Alert mb={4} severity="info" style={{ fontSize: "12px" }}>
                <AlertTitle>Info</AlertTitle>
                Ispravan unos —{" "}
                <strong>
                  Lozinka mora sadržavati najmanje 8 znakova, jedno veliko
                  slovo, jedan broj i jedan poseban znak. Unos i potvrda lozinke
                  moraju se podudarati.
                </strong>
              </Alert>
              <Grid container spacing={8}>
                <Grid item md={5}>
                  <CssTextField
                    focusColor="black"
                    name="firstName"
                    label="Ime"
                    {...register("firstName")}
                    error={errors.firstName}
                    helperText={errors.firstName && errors.firstName.message}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={5}>
                  <CssTextField
                    focusColor="black"
                    name="lastName"
                    label="Prezime"
                    {...register("lastName")}
                    error={errors.lastName}
                    helperText={errors.lastName && errors.lastName.message}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={5}>
                  <CssTextField
                    focusColor="black"
                    name="email"
                    label="Email"
                    {...register("email")}
                    error={errors.email}
                    helperText={errors.email && errors.email.message}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={5}>
                  <CssTextField
                    focusColor="black"
                    name="username"
                    label="Korisničko ime"
                    {...register("username")}
                    error={errors.username}
                    helperText={errors.username && errors.username.message}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={5}>
                  <CssTextField
                    type="password"
                    focusColor="black"
                    name="password"
                    label="Lozinka"
                    {...register("password")}
                    error={errors.password}
                    helperText={errors.password && errors.password.message}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={5}>
                  <CssTextField
                    type="password"
                    focusColor="black"
                    name="confirmPassword"
                    label="Potvrdi lozinku"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword}
                    helperText={
                      errors.confirmPassword && errors.confirmPassword.message
                    }
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={12}>
                  <Divider />
                  <h4>Role</h4>
                  <Grid item md={5}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          {...register("roleAdmin")}
                          name="roleAdmin"
                          style={{ color: "black" }}
                        />
                      }
                      label={"Administrator"}
                    />
                  </Grid>
                  <RadioGroup
                    name="role"
                    value={valueRole}
                    onChange={handleChangeRole}
                  >
                    <FormControlLabel
                      value="Back office upravitelj"
                      control={
                        <Radio
                          icon={
                            <CheckBoxOutlineBlank style={{ color: "black" }} />
                          }
                          checkedIcon={<CheckBox style={{ color: "black" }} />}
                        />
                      }
                      label="Back office upravitelj"
                    />
                    <FormControlLabel
                      value="Back office samo pregled"
                      control={
                        <Radio
                          icon={
                            <CheckBoxOutlineBlank style={{ color: "black" }} />
                          }
                          checkedIcon={<CheckBox style={{ color: "black" }} />}
                        />
                      }
                      label="Back office samo pregled"
                    />
                    {/* <Grid item md={5}>
                      <FormControlLabel
                        value="manager"
                        control={
                          <Checkbox
                            {...register("BOmanager")}
                            name="BOmanager"
                            style={{ color: "black" }}
                          />
                        }
                        label={"Back office upravitelj"}
                      />
                    </Grid>
                    <Grid item md={5}>
                      <FormControlLabel
                        value="readonly"
                        control={
                          <Checkbox
                            {...register("BOreadonly")}
                            name="BOreadonly"
                            style={{ color: "black" }}
                          />
                        }
                        label={"Back office samo pregled "}
                      />
                    </Grid> */}
                  </RadioGroup>
                </Grid>
              </Grid>
              <div style={{ marginTop: "20px" }}>
                <Button type="submit" variant="contained" color="error" mt={3}>
                  Spremi
                </Button>
                &nbsp; &nbsp;
                <Button
                  onClick={() => navigate(-1)}
                  style={{ backgroundColor: "black" }}
                  type="button"
                  variant="contained"
                  mt={3}
                >
                  Odustani
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <BootstrapDialog
        PaperProps={{ sx: { width: "30%", height: "40%" } }}
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle>
          {isSuccessfull == true ? (
            <strong>Uspješno</strong>
          ) : (
            <strong>Greška</strong>
          )}
        </DialogTitle>
        <DialogContent
          dividers
          style={{ textAlign: "center", padding: "20px" }}
        >
          {isSuccessfull == true ? (
            <>
              <CheckCircleOutline
                style={{ color: "green", fontSize: "80px" }}
              />
              <br />
              <br />
              <br />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                Uspješno ste dodali korisnika!
              </span>
            </>
          ) : (
            <>
              <ErrorOutline style={{ color: "red", fontSize: "80px" }} />
              <br />
              <br />
              <br />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                {errorMessage && errorMessage}
              </span>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

function CreateUser() {
  return (
    <React.Fragment>
      <Helmet title="Korisnik" />
      <Typography variant="h3" gutterBottom display="inline">
        Novi korisnik
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Link component={NavLink} to="/settings/users">
          Korisnici
        </Link>
        <Typography>Novi korisnik</Typography>
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

export default CreateUser;
