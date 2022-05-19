import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as dateHelper from "../../../../components/Config/DateHelper";
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
import "./user.css";

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
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const { register, handleSubmit, reset, formState } = useForm(validationOpt);

  const { errors } = formState;
  const { state } = useLocation();
  const navigate = useNavigate();

  let userName = state.username;

  let userRoleNames = [];

  let roleAdmin = "";

  let roleManager = "";

  let roleReadOnly = "";

  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [userRoles, setUserRoles] = useState([]);
  const [isSuccessfull, setIsSuccessfull] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckedManager, setIsCheckedManager] = useState();
  const [isCheckedReadOnly, setIsCheckedReadOnly] = useState();
  const [isTouchedManager, setIsTouchedManager] = useState(false);
  const [isTouchedReadOnly, setIsTouchedReadOnly] = useState(false);

  useEffect(() => {
    userService
      .getUserByUserName(userName)
      .then((res) => {
        setUserDetails(res.data);
        setUserRoles(res.data.roles);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  userRoles.map((role) => {
    return userRoleNames.push(role.name);
  });

  userRoleNames
    .filter((name) => name == "Administrator")
    .map((role) => (roleAdmin = role));

  userRoleNames
    .filter((name) => name == "Back office upravitelj")
    .map((role) => (roleManager = role));

  userRoleNames
    .filter((name) => name == "Back office pregled")
    .map((role) => (roleReadOnly = role));

  const submit = (data) => {
    setIsLoading(true);
    let roles = [];
    let manager;
    let readOnly;

    if (isTouchedManager) {
      manager = isCheckedManager;
    } else {
      manager = data.roleManager;
    }

    if (manager == true) {
      readOnly = false;
    }

    if (isTouchedReadOnly) {
      readOnly = isCheckedReadOnly;
    } else if (isTouchedReadOnly == false && isCheckedReadOnly == false) {
      readOnly = false;
    } else {
      readOnly = data.roleReadOnly;
    }

    if (data.roleAdmin == true) {
      if (userRoles.filter((role) => role.name == "Administrator").length > 0) {
        userRoles
          .filter((role) => role.name == "Administrator")
          .map((role) => roles.push(role));
      } else {
        var roleA = {
          name: "Administrator",
        };
        roles.push(roleA);
      }
    }

    if (manager == true) {
      if (
        userRoles.filter((role) => role.name == "Back office upravitelj")
          .length > 0
      ) {
        userRoles
          .filter((role) => role.name == "Back office upravitelj")
          .map((role) => roles.push(role));
      } else {
        var roleM = {
          name: "Back office upravitelj",
        };
        roles.push(roleM);
      }
    }

    if (readOnly == true) {
      if (
        userRoles.filter((role) => role.name == "Back office pregled").length >
        0
      ) {
        userRoles
          .filter((role) => role.name == "Back office pregled")
          .map((role) => roles.push(role));
      } else {
        var roleM = {
          name: "Back office pregled",
        };
        roles.push(roleM);
      }
    }

    userService
      .updateUser(
        userDetails.ref,
        data.username,
        data.firstName,
        data.lastName,
        data.email,
        data.status,
        userDetails.createdDate,
        userDetails.deactivateDate,
        roles
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
              <Grid container spacing={8}>
                <Grid item md={5}>
                  <CssTextField
                    focusColor="black"
                    defaultValue={userDetails && userDetails.firstName}
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
                    defaultValue={userDetails && userDetails.lastName}
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
                    defaultValue={userDetails && userDetails.email}
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
                    value={userDetails && userDetails.username}
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
                    focusColor="black"
                    value={
                      userDetails &&
                      dateHelper.formatUtcToDate(userDetails.createdDate)
                    }
                    name="createDate"
                    label="Datum kreiranja"
                    {...register("createDate")}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={5}>
                  <CssTextField
                    focusColor="black"
                    value={
                      userDetails &&
                      dateHelper.formatUtcToDate(userDetails.deactivateDate) !==
                        null
                        ? userDetails.deactivateDate
                        : "-"
                    }
                    name="deactivationDate"
                    label="Datum deaktivacije"
                    {...register("deactivationDate")}
                    fullWidth
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={5}>
                  <CssTextField
                    focusColor="black"
                    value={userDetails && userDetails.status}
                    name="status"
                    label="Status"
                    {...register("status")}
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
                          defaultChecked={roleAdmin ? true : false}
                          {...register("roleAdmin")}
                          name="roleAdmin"
                          style={{ color: "black" }}
                        />
                      }
                      label={"Administrator"}
                    />
                  </Grid>
                  <Grid item md={5}>
                    <label>
                      <input
                        id="myCheckbox"
                        name="roleManager"
                        type="checkbox"
                        defaultChecked={roleManager ? true : false}
                        {...register("roleManager")}
                        checked={isCheckedManager}
                        onChange={(event) => {
                          setIsTouchedManager(true);
                          setIsCheckedManager(event.target.checked);
                          if (event.target.checked) {
                            setIsCheckedReadOnly(false);
                          }
                        }}
                      />
                      Back office upravitelj
                    </label>
                    <br />
                  </Grid>
                  <Grid item md={5}>
                    <label>
                      <input
                        id="myCheckbox"
                        name="roleReadOnly"
                        type="checkbox"
                        defaultChecked={roleReadOnly ? true : false}
                        {...register("roleReadOnly")}
                        checked={isCheckedReadOnly}
                        onChange={(event) => {
                          setIsTouchedReadOnly(true);
                          setIsCheckedReadOnly(event.target.checked);
                          if (event.target.checked) {
                            setIsCheckedManager(false);
                          }
                        }}
                      />
                      Back office pregled
                    </label>
                  </Grid>
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
                Uspješno ste uredili korisnika!
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

function UpdateUser() {
  return (
    <React.Fragment>
      <Helmet title="Korisnik" />
      <Typography variant="h3" gutterBottom display="inline">
        Uredi korisnika
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Link component={NavLink} to="/settings/users">
          Korisnici
        </Link>
        <Typography>Uredi korisnika</Typography>
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

export default UpdateUser;
