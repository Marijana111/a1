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
  AlertTitle,
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Delete from "@mui/icons-material/Delete";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { requestService } from "../../../Services/requestService";
import * as dateHelper from "../../../components/Config/DateHelper";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
  name: null,
  value: null,
};

function BasicForm() {
  const { state } = useLocation();
  const [valueDateFrom, setValueDateFrom] = useState(new Date());
  const [statusValue, setStatusValue] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessfull, setIsSuccessfull] = useState(true);
  const [valuesForm, setValuesForm] = useState([
    {
      name: null,
      value: null,
    },
  ]);

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
    valuesForm.shift();

    if (valuesForm.length > 0) {
      let parameter = valuesForm;
      requestService
        .createStatusWithParameters({
          data: {
            parameter,
          },
          requestId: state.requestDetails.requestId,
          status: {
            date: dateHelper.formatUtcToDateApiMiliSec(valueDateFrom),
            description: descriptionValue,
            type: statusValue,
          },
        })
        .then((res) => {
          if (res.data.responseStatus.code == 0) {
            setIsSuccessfull(true);
          } else if (res.data.responseStatus.code !== 0) {
            setIsSuccessfull(false);
            setErrorMessage(res.data.responseStatus.message);
          }
          setOpenDialog(true);
          setStatus({ sent: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (valuesForm.length == 0) {
      requestService
        .createStatusNoParameters({
          requestId: state.requestDetails.requestId,
          status: {
            date: dateHelper.formatUtcToDateApiMiliSec(valueDateFrom),
            description: descriptionValue,
            type: statusValue,
          },
        })
        .then((res) => {
          if (res.data.responseStatus.code == 0) {
            setIsSuccessfull(true);
          } else if (res.data.responseStatus.code !== 0) {
            setIsSuccessfull(false);
            setErrorMessage(res.data.responseStatus.message);
          }
          setOpenDialog(true);
          setStatus({ sent: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const navigate = useNavigate();

  const handleClick = (values) => {
    let index;

    index = valuesForm.findIndex((x) => x.name === values.name);

    if (index == -1 && (values.name !== "" || values.value !== "")) {
      setValuesForm([
        ...valuesForm,
        {
          name: values.name,
          value: values.value,
        },
      ]);
      valuesForm.shift();
      setMessage("");
      values.name = "";
      values.value = "";
    } else {
      setMessage("Parametar s tim nazivom već postoji.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate(-1);
  };

  return (
    <>
      <Card mb={6}>
        <CardContent>
          {state.requestDetails && (
            <Grid style={{ fontSize: "14px" }} container spacing={6}>
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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                <>
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
                            Uspješno ste dodali status!
                          </span>
                        </>
                      ) : (
                        <>
                          <ErrorOutline
                            style={{ color: "red", fontSize: "80px" }}
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
              )}

              {isSubmitting ? (
                <Box display="flex" justifyContent="center" my={6}>
                  <CircularProgress />
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Alert mb={4} severity="info">
                    <AlertTitle>Info</AlertTitle>
                    Ispravan unos —{" "}
                    <strong>
                      Molimo Vas da unesete sva polja kako biste ispravno dodali
                      status!
                    </strong>
                  </Alert>
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
                        fullWidth
                        value={statusValue}
                        onChange={(event) => {
                          setStatusValue(event.target.value);
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
                        value={descriptionValue}
                        onChange={(event) => {
                          setDescriptionValue(event.target.value);
                        }}
                        fullWidth
                        variant="outlined"
                        select
                      >
                        <MenuItem value={0}>Odaberite opis</MenuItem>
                        {optionsDescription.map((status) => (
                          <MenuItem key={status.value} value={status.name}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </Grid>
                    <Grid item md={3}>
                      <DateTimePicker
                        name="date"
                        label="Datum"
                        inputFormat="dd.MM.yyyy. hh:mm:ss a"
                        fullWidth
                        value={valueDateFrom}
                        ampm
                        onChange={(newValue) => {
                          setValueDateFrom(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                  </Grid>
                  <Divider style={{ marginTop: "20px" }} />
                  <Grid item>
                    <Typography gutterBottom display="inline">
                      <h3>Dodaj parametar</h3>
                    </Typography>
                  </Grid>
                  <Grid container spacing={6}>
                    <Grid item md={4}>
                      <CssTextField
                        focusColor="black"
                        name="name"
                        label="Naziv"
                        value={values.name}
                        fullWidth
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                      {message ? (
                        <p
                          style={{
                            fontSize: "10px",
                            color: "red",
                            marginTop: "0px",
                          }}
                        >
                          {message}
                        </p>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item md={4}>
                      <CssTextField
                        focusColor="black"
                        name="value"
                        label="Vrijednost"
                        value={values.value}
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={2}>
                      <Button
                        disabled={values.name == "" || values.value == ""}
                        onClick={() => handleClick(values)}
                        variant="contained"
                        type="button"
                        color="error"
                        style={{ marginTop: "14px" }}
                      >
                        <AddIcon />
                        Dodaj
                      </Button>
                    </Grid>
                    <>
                      {valuesForm.length > 1 ? (
                        <Grid item md={12}>
                          <Typography gutterBottom>
                            <h3>Uneseni parametri</h3>
                          </Typography>
                        </Grid>
                      ) : (
                        ""
                      )}
                      {valuesForm &&
                        valuesForm.map((element) =>
                          element.name !== null ? (
                            <>
                              <Grid
                                style={{ marginLeft: "1px" }}
                                container
                                spacing={6}
                              >
                                <Grid item md={4}>
                                  <CssTextField
                                    disabled
                                    focusColor="black"
                                    name="name"
                                    label="Naziv"
                                    value={element.name}
                                    fullWidth
                                    variant="outlined"
                                    my={2}
                                  />
                                </Grid>
                                <Grid item md={4}>
                                  <CssTextField
                                    disabled
                                    focusColor="black"
                                    name="value"
                                    label="Vrijednost"
                                    value={element.value}
                                    fullWidth
                                    variant="outlined"
                                    my={2}
                                  />
                                </Grid>
                                <Grid
                                  style={{ paddingLeft: "0px" }}
                                  item
                                  md={1}
                                >
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      let filteredArrayParams;
                                      filteredArrayParams = valuesForm.filter(
                                        (param) => param.name !== element.name
                                      );
                                      setValuesForm(filteredArrayParams);
                                    }}
                                  >
                                    <Delete
                                      style={{
                                        color: "black",
                                        marginTop: "13px",
                                      }}
                                    />
                                  </Button>
                                </Grid>
                              </Grid>
                            </>
                          ) : (
                            ""
                          )
                        )}
                    </>
                  </Grid>
                  <Button
                    disabled={statusValue == null}
                    type="submit"
                    variant="contained"
                    color="error"
                    mt={3}
                  >
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
  return (
    <React.Fragment>
      <Helmet title="Status" />
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
        <Link component={NavLink} to={-1}>
          Detalji
        </Link>
        <Typography>Status</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <BasicForm />
    </React.Fragment>
  );
}

export default FormikPage;
