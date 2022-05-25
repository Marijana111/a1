import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import * as dateHelper from "../../../../components/Config/DateHelper";
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
} from "@mui/material";
import { spacing } from "@mui/system";
import { userService } from "../../../../Services/userService";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
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
    newPassword: Yup.string()
      .required("Obavezno polje!")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Unesite ispravan format."
      ),
    confirmPassword: Yup.string()
      .required("Obavezno polje!")
      .oneOf([Yup.ref("newPassword")], "Lozinke nisu iste."),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const { register, handleSubmit, reset, formState } = useForm(validationOpt);

  const { errors } = formState;

  const { state } = useLocation();
  const navigate = useNavigate();

  let userName = state.username;

  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleChangePassword, setIsVisibleChangePassword] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    userService
      .getUserByUserName(userName)
      .then((res) => {
        setUserDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (data) => {
    setIsLoading(true);
    userService
      .changePassword(userDetails.ref, data.confirmPassword, data.newPassword)
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
            {userDetails && (
              <Grid style={{ fontSize: "14px" }} container spacing={6}>
                <Grid item md={6}>
                  <div>
                    <b>Ime:</b> {userDetails.firstName}
                  </div>
                  <div>
                    <b>Prezime:</b> {userDetails.lastName}
                  </div>
                  <div>
                    <b>Korisničko ime:</b> {userDetails.username}
                  </div>
                  <div>
                    <b>Email:</b> {userDetails.email}
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div>
                    <b>Role:</b>{" "}
                    {userDetails.roles &&
                      userDetails.roles.map((role, i, arr) => (
                        <span key={role.ref}>
                          {role.name} {i != arr.length - 1 ? ", " : ""}
                        </span>
                      ))}
                  </div>
                  <div>
                    <b>Datum kreiranja:</b>{" "}
                    {dateHelper.formatUtcToDate(userDetails.createdDate)}
                  </div>
                  <div>
                    <b>Datum deaktivacije:</b>{" "}
                    {dateHelper.formatUtcToDate(userDetails.deactivateDate)}
                  </div>
                  <div>
                    <b>Status:</b> {userDetails.status}
                  </div>
                </Grid>
              </Grid>
            )}
          </CardContent>
          <Divider />
          <CardContent>
            <span>
              Za izmjenu lozinke kliknite &nbsp;
              <Button
                style={{ backgroundColor: "black" }}
                onClick={() => setIsVisibleChangePassword(true)}
                variant="contained"
                type="button"
              >
                ovdje
              </Button>
            </span>
            {isVisibleChangePassword ? (
              <form
                style={{ marginTop: "20px" }}
                onSubmit={handleSubmit(submit)}
              >
                <Alert mb={4} severity="info">
                  <AlertTitle>Info</AlertTitle>
                  Ispravan unos —{" "}
                  <strong>
                    Lozinka mora sadržavati najmanje 8 znakova, jedno veliko
                    slovo, jedan broj i jedan poseban znak. Nova i potvrđena
                    lozinka moraju biti iste.
                  </strong>
                </Alert>
                <Grid container spacing={6}>
                  <Grid item md={12}>
                    <CssTextField
                      type="password"
                      focusColor="black"
                      name="newPassword"
                      label="Nova lozinka"
                      {...register("newPassword")}
                      error={errors.newPassword}
                      helperText={
                        errors.newPassword && errors.newPassword.message
                      }
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <br />
                  <Grid item md={12}>
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
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <div style={{ marginTop: "20px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    mt={3}
                  >
                    Spremi
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    onClick={() => setIsVisibleChangePassword(false)}
                    style={{ backgroundColor: "black" }}
                    type="button"
                    variant="contained"
                    mt={3}
                  >
                    Odustani
                  </Button>
                </div>
              </form>
            ) : (
              ""
            )}
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
                Uspješno ste izmjenili lozinku!
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

function UserDetail() {
  return (
    <React.Fragment>
      <Helmet title="Detalji" />
      <Typography variant="h3" gutterBottom display="inline">
        Detalji korisnika
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Link component={NavLink} to="/settings/users">
          Korisnici
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

export default UserDetail;
