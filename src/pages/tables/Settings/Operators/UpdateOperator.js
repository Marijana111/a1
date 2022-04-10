import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
  LinearProgress,
  Button,
  FormControlLabel,
  Switch,
  Checkbox,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { operatorsService } from "../../../../Services/operatorsService";
import "./operators.css";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TextField = styled(MuiTextField)(spacing);

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

function EmptyCard() {
  const { register, handleSubmit, errors, control, formState, setValue } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
    });
  const { state } = useLocation();
  const navigate = useNavigate();

  let operatorRef = state.operatorRef;
  let filteredTypes = [];
  let operatorTypeNames = [];

  const [operatorName, setOperatorName] = useState("");
  const [operatorOib, setOperatorOib] = useState("");
  const [possibleRequestTypes, setPossibleRequestTypes] = useState([]);
  const [operatorRequestTypes, setOperatorRequestTypes] = useState([]);
  const [operatorReportTypes, setOperatorReportTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    operatorsService
      .getOperatorByRef(operatorRef)
      .then((res) => {
        setOperatorRequestTypes(res.data.operatorRequestTypes);
        setOperatorReportTypes(res.data.operatorReportTypes);
        setOperatorName(res.data.operatorName);
        setOperatorOib(res.data.operatorReferenceId);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    operatorsService
      .getRequestTypes()
      .then((res) => {
        setPossibleRequestTypes(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  operatorRequestTypes.map((type) => {
    return operatorTypeNames.push(type.requestType.typeName);
  });

  filteredTypes = possibleRequestTypes.filter(
    (type) => !operatorTypeNames.includes(type.requestTypeName)
  );

  const setRequestTypeInputsEnabled = (typeName, checked) => {
    document.getElementById(typeName).disabled = !checked;
  };

  const setPossibleRequestTypeInputsEnabled = (typeName, checked) => {
    document.getElementById(typeName).disabled = !checked;
  };

  const submit = (data) => {
    let typeRefArray = [];
    let sblAccountIdArray = [];
    let sblBillingAccountIdArray = [];
    let sblBillingProfileIdArray = [];
    let sblBillingProfileNameArray = [];
    let typeOfVariableExisting = typeof data.switchExistingType;
    let typeOfVariablePossible = typeof data.switchPossibleType;

    //Postojeći requestType
    if (data.switchExistingType) {
      if (typeOfVariableExisting !== "string") {
        data.switchExistingType.forEach((element) => {
          typeRefArray.push(document.getElementById(element + "typeRef").value);

          sblAccountIdArray.push(
            document.getElementById(element + "sblAccountId").value
          );

          sblBillingAccountIdArray.push(
            document.getElementById(element + "sblBillingAccountId").value
          );

          sblBillingProfileIdArray.push(
            document.getElementById(element + "sblBillingProfileId").value
          );

          sblBillingProfileNameArray.push(
            document.getElementById(element + "sblBillingProfileName").value
          );
        });
      } else {
        typeRefArray.push(
          document.getElementById(data.switchExistingType + "typeRef").value
        );

        sblAccountIdArray.push(
          document.getElementById(data.switchExistingType + "sblAccountId")
            .value
        );

        sblBillingAccountIdArray.push(
          document.getElementById(
            data.switchExistingType + "sblBillingAccountId"
          ).value
        );

        sblBillingProfileIdArray.push(
          document.getElementById(
            data.switchExistingType + "sblBillingProfileId"
          ).value
        );

        sblBillingProfileNameArray.push(
          document.getElementById(
            data.switchExistingType + "sblBillingProfileName"
          ).value
        );
      }
    }

    //Mogući requestType
    if (data.switchPossibleType) {
      if (typeOfVariablePossible !== "string") {
        data.switchPossibleType.forEach((element) => {
          typeRefArray.push(
            document.getElementById(element + "typeRefPoss").value
          );

          sblAccountIdArray.push(
            document.getElementById(element + "AccountIdPoss").value
          );

          sblBillingAccountIdArray.push(
            document.getElementById(element + "BillingAccountIdPoss").value
          );

          sblBillingProfileIdArray.push(
            document.getElementById(element + "BillingProfileIdPoss").value
          );

          sblBillingProfileNameArray.push(
            document.getElementById(element + "BillingProfileNamePoss").value
          );
        });
      } else {
        typeRefArray.push(
          document.getElementById(data.switchPossibleType + "typeRefPoss").value
        );

        sblAccountIdArray.push(
          document.getElementById(
            data.switchPossibleType + "BillingAccountIdPoss"
          ).value
        );

        sblBillingAccountIdArray.push(
          document.getElementById(
            data.switchPossibleType + "BillingAccountIdPoss"
          ).value
        );

        sblBillingProfileIdArray.push(
          document.getElementById(
            data.switchPossibleType + "BillingProfileIdPoss"
          ).value
        );

        sblBillingProfileNameArray.push(
          document.getElementById(
            data.switchPossibleType + "BillingProfileNamePoss"
          ).value
        );
      }
    }

    operatorsService
      .updateOperator(
        data.name,
        data.oib,
        typeRefArray,
        sblAccountIdArray,
        sblBillingAccountIdArray,
        sblBillingProfileIdArray,
        sblBillingProfileNameArray,
        data.checkboxReport
      )
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isLoading ? (
        <LinearProgress />
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
                value={operatorName && operatorName}
                {...register("name")}
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
                value={operatorOib && operatorOib}
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
            {operatorRequestTypes.length !== 0 &&
              operatorRequestTypes.map((type) => {
                return (
                  <>
                    <Grid container justify="center" md={3}>
                      <FormControlLabel
                        style={{ marginLeft: "25px" }}
                        centered
                        component
                        control={
                          <StyledSwitch
                            key={type.requestType.typeId}
                            defaultChecked
                            value={type.requestType.typeName}
                            onClick={(event) => {
                              setRequestTypeInputsEnabled(
                                type.requestType.typeName,
                                event.target.checked
                              );
                            }}
                            {...register("switchExistingType")}
                            style={{ color: "#233044" }}
                            name="switchExistingType"
                          />
                        }
                        label={type.requestType.typeDescription}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <fieldset id={type.requestType.typeName}>
                        <input
                          className="inputNonDisplay"
                          value={type.requestType.typeRef}
                          type="text"
                          id={type.requestType.typeName + "typeRef"}
                        />
                        <CssTextField
                          id={type.requestType.typeName + "sblAccountId"}
                          key={type.wholesaleAccount.sblAccountId}
                          focusColor="black"
                          defaultValue={type.wholesaleAccount.sblAccountId}
                          name="AccountId"
                          label="AccountId"
                          {...register("AccountId")}
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                        <CssTextField
                          id={type.requestType.typeName + "sblBillingAccountId"}
                          key={type.wholesaleAccount.sblBillingAccountId}
                          focusColor="black"
                          name="BillingAccountId"
                          label="BillingAccountId"
                          {...register("BillingAccountId")}
                          defaultValue={
                            type.wholesaleAccount.sblBillingAccountId
                          }
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                        <CssTextField
                          id={type.requestType.typeName + "sblBillingProfileId"}
                          key={type.wholesaleAccount.sblBillingProfileId}
                          focusColor="black"
                          name="BillingProfileId"
                          label="BillingProfileId"
                          {...register("BillingProfileId")}
                          defaultValue={
                            type.wholesaleAccount.sblBillingProfileId
                          }
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                        <CssTextField
                          id={
                            type.requestType.typeName + "sblBillingProfileName"
                          }
                          key={type.wholesaleAccount.sblBillingProfileName}
                          focusColor="black"
                          name="BillingProfileName"
                          label="BillingProfileName"
                          {...register("BillingProfileName")}
                          defaultValue={
                            type.wholesaleAccount.sblBillingProfileName
                          }
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                      </fieldset>
                    </Grid>
                  </>
                );
              })}
            {filteredTypes.length !== 0 &&
              filteredTypes.map((filType) => {
                return (
                  <>
                    <Grid container justify="center" md={3}>
                      <FormControlLabel
                        style={{ marginLeft: "25px" }}
                        centered
                        component
                        control={
                          <StyledSwitch
                            key={filType.requestTypeId}
                            defaultChecked={false}
                            value={filType.requestTypeName}
                            onClick={(event) => {
                              setPossibleRequestTypeInputsEnabled(
                                filType.requestTypeName,
                                event.target.checked
                              );
                            }}
                            {...register("switchPossibleType")}
                            style={{ color: "#233044" }}
                            name="switchPossibleType"
                          />
                        }
                        label={filType.requestTypeDescription}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <fieldset disabled id={filType.requestTypeName}>
                        <input
                          className="inputNonDisplay"
                          value={filType.requestTypeRef}
                          type="text"
                          id={filType.requestTypeName + "typeRefPoss"}
                        />
                        <CssTextField
                          id={filType.requestTypeName + "AccountIdPoss"}
                          focusColor="black"
                          name="AccountIdPoss"
                          label="AccountId"
                          {...register("AccountIdPoss")}
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                        <CssTextField
                          id={filType.requestTypeName + "BillingAccountIdPoss"}
                          focusColor="black"
                          name="BillingAccountIdPoss"
                          {...register("BillingAccountIdPoss")}
                          label="BillingAccountId"
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                        <CssTextField
                          id={filType.requestTypeName + "BillingProfileIdPoss"}
                          focusColor="black"
                          name="BillingProfileIdPoss"
                          {...register("BillingProfileIdPoss")}
                          label="BillingProfileId"
                          fullWidth
                          variant="outlined"
                          my={2}
                        />
                        <CssTextField
                          id={
                            filType.requestTypeName + "BillingProfileNamePoss"
                          }
                          focusColor="black"
                          name="BillingProfileNamePoss"
                          {...register("BillingProfileNamePoss")}
                          label="BillingProfileName"
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
            {operatorReportTypes.length !== 0 &&
              operatorReportTypes.map((repType) => (
                <Grid item md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        key={repType.report.reportId}
                        value={repType.report.reportType}
                        {...register("checkboxReport")}
                        name="checkboxReport"
                        style={{ color: "black" }}
                      />
                    }
                    label={repType.report.reportName}
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
    </>
  );
}

function RequestDetail() {
  return (
    <React.Fragment>
      <Helmet title="Uredi" />
      <Typography variant="h3" gutterBottom display="inline">
        Uredi operatora
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Typography>Postavke</Typography>
        <Link component={NavLink} to="/settings/operators">
          Operatori
        </Link>
        <Typography>Uredi operatora</Typography>
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

export default RequestDetail;
