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
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { format } from "date-fns";

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

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#0a93f2",
  },
}));

function BasicForm() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm({
  //   mode: "onChange",
  //   reValidateMode: "onChange",
  // });

  const { register, handleSubmit, errors, control, formState, setValue } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
    });

  const navigate = useNavigate();
  const [requestTypes, setRequestTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessageOIB, setErrorMessageOIB] = useState("");
  const [isSuccessfull, setIsSuccessfull] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  let reportTypes = [
    { value: "10", label: "Izvještaj o dostupnim adresama" },
    { value: "11", label: "Izvještaj o dostupnosti po adresi" },
    { value: "12", label: "Provjera statusa usluge po oznaci priključka" },
    {
      value: "13",
      label: "Izvještaj o slobodnim kapacitetima po distribucijskom čvoru",
    },
  ];

  useEffect(() => {
    operatorsService
      .getRequestTypes()
      .then((res) => {
        setRequestTypes(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const setRequestTypeInputsEnabled = (typeName, checked) => {
    document.getElementById(typeName).disabled = !checked;
  };

  const submit = (data) => {
    let typeRefArray = [];
    let sblAccountIdArray = [];
    let sblBillingAccountIdArray = [];
    let sblBillingProfileIdArray = [];
    let sblBillingProfileNameArray = [];

    if (data.switchRequestType) {
      if (data.switchRequestType.length > 1) {
        data.switchRequestType.forEach((element) => {
          typeRefArray.push(document.getElementById(element + "typeRef").value);

          sblAccountIdArray.push(
            document.getElementById(element + "AccountId").value
          );

          sblBillingAccountIdArray.push(
            document.getElementById(element + "BillingAccountId").value
          );

          sblBillingProfileIdArray.push(
            document.getElementById(element + "BillingProfileId").value
          );

          sblBillingProfileNameArray.push(
            document.getElementById(element + "BillingProfileName").value
          );
        });
      } else {
        typeRefArray.push(
          document.getElementById(data.switchRequestType + "typeRef").value
        );

        sblAccountIdArray.push(
          document.getElementById(data.switchRequestType + "AccountId").value
        );

        sblBillingAccountIdArray.push(
          document.getElementById(data.switchRequestType + "BillingAccountId")
            .value
        );

        sblBillingProfileIdArray.push(
          document.getElementById(data.switchRequestType + "BillingProfileId")
            .value
        );

        sblBillingProfileNameArray.push(
          document.getElementById(data.switchRequestType + "BillingProfileName")
            .value
        );
      }
    }

    setIsLoading(true);
    operatorsService
      .createOperator(
        data.name,
        data.oib,
        typeRefArray,
        sblAccountIdArray,
        sblBillingAccountIdArray,
        sblBillingProfileIdArray,
        sblBillingProfileNameArray,
        data.checkboxReport == false ? [] : data.checkboxReport
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
    navigate("/settings/operators");
  };

  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : (
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
                onChange={(event) => {
                  if (event.target.value !== "") {
                    setErrorMessageName("");
                  } else {
                    setErrorMessageName("Unesite validan naziv.");
                  }
                }}
                error={errorMessageName}
                helperText={errorMessageName ? errorMessageName : ""}
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
                onChange={(event) => {
                  let pattern = /^[0-9]*$/;
                  if (
                    pattern.test(event.target.value) &&
                    event.target.value.length == 11 &&
                    event.target.value !== ""
                  ) {
                    setErrorMessageOIB("");
                  } else {
                    setErrorMessageOIB("Unesite validan OIB.");
                  }
                }}
                error={errorMessageOIB}
                helperText={errorMessageOIB ? errorMessageOIB : ""}
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
            {requestTypes.length !== 0 &&
              requestTypes.map((type) => {
                return (
                  <>
                    <Grid container justify="center" md={3}>
                      <FormControlLabel
                        style={{ marginLeft: "25px" }}
                        centered
                        component
                        control={
                          <StyledSwitch
                            key={type.requestTypeId}
                            value={type.requestTypeName}
                            onClick={(event) => {
                              setRequestTypeInputsEnabled(
                                type.requestTypeName,
                                event.target.checked
                              );
                            }}
                            {...register("switchRequestType")}
                            style={{ color: "#233044" }}
                            name="switchRequestType"
                          />
                        }
                        label={type.requestTypeDescription}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <fieldset disabled id={type.requestTypeName}>
                        <input
                          className="inputNonDisplay"
                          value={type.requestTypeRef}
                          type="text"
                          id={type.requestTypeName + "typeRef"}
                        />
                        <CssTextField
                          id={type.requestTypeName + "AccountId"}
                          focusColor="black"
                          name="AccountId"
                          label="AccountId"
                          {...register("AccountId")}
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                        <CssTextField
                          id={type.requestTypeName + "BillingAccountId"}
                          focusColor="black"
                          name="BillingAccountId"
                          label="BillingAccountId"
                          {...register("BillingAccountId")}
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                        <CssTextField
                          id={type.requestTypeName + "BillingProfileId"}
                          focusColor="black"
                          name="BillingProfileId"
                          label="BillingProfileId"
                          {...register("BillingProfileId")}
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                        <CssTextField
                          id={type.requestTypeName + "BillingProfileName"}
                          focusColor="black"
                          name="BillingProfileName"
                          label="BillingProfileName"
                          {...register("BillingProfileName")}
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                      </fieldset>
                    </Grid>
                  </>
                );
              })}
            <Grid item md={12}>
              <h4>
                <strong>Izvještaji</strong>
              </h4>
              <Divider />
            </Grid>
            {reportTypes.length !== 0 &&
              reportTypes.map((repType) => (
                <Grid item md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={repType.value}
                        {...register("checkboxReport")}
                        name="checkboxReport"
                        style={{ color: "black" }}
                      />
                    }
                    label={repType.label}
                  />
                </Grid>
              ))}
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
                Uspješno ste uredili operatora!
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
