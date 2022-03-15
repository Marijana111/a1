import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  MenuItem,
  Grid,
  TextField as MuiTextField,
  FormControl as MuiFormControl,
  LinearProgress,
  Chip as MuiChip,
  Button as MuiButton,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Loop as LoopIcon } from "@mui/icons-material";
import { spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { requestService } from "../../../Services/requestService";
import { FilterList, RemoveRedEye } from "@mui/icons-material";
import { green, orange, red, grey } from "@mui/material/colors";
import { DatePicker } from "@mui/lab";
import { selectService } from "../../../Services/selectService";
import { faultOrdersService } from "../../../Services/faultOrdersService";
import * as dateHelper from "../../../components/Config/DateHelper";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.status == "REALIZIRAN" && green[500]};
  background: ${(props) => props.status == "PRIHVAĆEN" && orange[500]};
  background: ${(props) => props.status == "ODBIJEN" && red[500]};
  background: ${(props) => props.status == "STORNIRAN" && green[500]};
  background: ${(props) => props.status == "INFO" && grey[500]};
  background: ${(props) => props.status == "REALIZIRAN_OK" && green[500]};
  background: ${(props) => props.status == "REALIZIRAN_NOK" && orange[500]};
`;

const Button = styled(MuiButton)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;

  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focusColor,
    },
  },
}));

function DataGridDemo() {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(new Date());
  const [faultOrders, setFaultOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleFilters, setIsVisibleFilter] = useState(false);
  const [valueDateFrom, setValueDateFrom] = useState(null);
  const [valueDateTo, setValueDateTo] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  const [statusIntValue, setStatusIntValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [requestTypeValue, setRequestTypeValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState(null);
  const [operatorsOptions, setOperatorsOptions] = useState([]);
  const [requestTypesOptions, setRequestTypesOptions] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [reloadData, setReloadData] = useState(false);
  const [search, setSearch] = useState({
    caseId: "",
    guid: "",
    adapterId: "",
    dateFrom: null,
    dateTo: null,
    operator: 0,
    type: 0,
    category: 0,
    status: 0,
    statusInt: 0,
  });

  useEffect(() => {
    faultOrdersService
      .getFaultOrders()
      .then((res) => {
        setFaultOrders(res.data.requestList);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    selectService
      .getOperators()
      .then((res) => {
        setOperatorsOptions(res.data);
      })
      .catch((err) => console.log(err));

    selectService
      .getRequestTypes()
      .then((res) => {
        setRequestTypesOptions(res.data);
      })
      .catch((err) => console.log(err));
  }, [search, update, reloadData]);

  const columns = [
    { field: "requestId", headerName: "Case Id", width: 105 },
    {
      field: "requestGuid",
      headerName: "GUID",
      width: 310,
    },
    {
      field: "operatorName",
      headerName: "Operator",
      width: 150,
    },
    {
      field: "requestType",
      headerName: "Vrsta",
      width: 120,
    },
    {
      field: "requestCategory",
      headerName: "Kategorija",
      width: 170,
    },
    {
      field: "adapterId",
      headerName: "Adapter Id",
      width: 130,
    },
    {
      field: "requestDateInsert",
      headerName: "Vrijeme",
      type: "dateTime",
      valueGetter: ({ value }) => value && dateHelper.formatUtcToDate(value),
      width: 180,
    },
    {
      field: "statusName",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          size="small"
          mr={1}
          mb={1}
          label={params.row.statusName}
          status={params.row.statusName}
        />
      ),
    },

    {
      field: "statusRef",
      headerName: "Status interno",
      width: 140,
    },
    {
      field: "actions",
      headerName: "Akcije",
      sortable: false,
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<RemoveRedEye />}
          label="Detalji"
          onClick={() => handleToDetail(params.id)}
        />,
      ],
    },
  ];

  const handleToDetail = (id) => {
    navigate(`/fault-orders/details/${id}`, {
      state: {
        requestId: id,
      },
    });
  };

  const optionsStatus = [
    { value: "PRIHVAĆEN", name: "PRIHVAĆEN" },
    { value: "REALIZIRAN", name: "REALIZIRAN" },
    { value: "ODBIJEN", name: "ODBIJEN" },
    { value: "STORNO", name: "STORNO" },
    { value: "INFO", name: "INFO" },
    { value: "REALIZIRAN_OK", name: "REALIZIRAN_OK" },
    { value: "REALIZIRAN_NOK", name: "REALIZIRAN_NOK" },
  ];

  const optionsStatusInt = [
    { value: "Status 1", name: "Status 1" },
    { value: "Status 2", name: "Status 2" },
    { value: "Status 3", name: "Status 3" },
  ];

  const optionsCategory = [
    { value: "Kategorija 1", name: "Kategorija 1" },
    { value: "Kategorija 2", name: "Kategorija 2" },
    { value: "Kategorija 3", name: "Kategorija 3" },
  ];

  const toggleFilters = () => {
    isVisibleFilters == false
      ? setIsVisibleFilter(true)
      : setIsVisibleFilter(false);
  };
  return (
    <>
      <Card mb={6}>
        <CardContent pb={1}>
          <Typography variant="h6" gutterBottom>
            <SmallButton
              onClick={() => setReloadData(true)}
              size="small"
              mr={2}
            >
              <LoopIcon style={{ color: "black" }} />
            </SmallButton>
            <Button onClick={() => toggleFilters()}>
              <FilterList style={{ color: "black", fontSize: "25px" }} />
            </Button>
            {isVisibleFilters ? (
              <>
                <Grid style={{ marginTop: "5px" }} container spacing={4}>
                  <Grid item md={2}>
                    <CssTextField
                      focusColor="black"
                      name="searchName"
                      label="Case Id"
                      //value={values.firstName}
                      fullWidth
                      onChange={(event) => {
                        setSearch({ ...search, caseId: event.target.value });
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={2}>
                    <CssTextField
                      focusColor="black"
                      name="searchPhone"
                      label="GUID"
                      //value={values.lastName}
                      fullWidth
                      onChange={(event) => {
                        setSearch({ ...search, guid: event.target.value });
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={2}>
                    <CssTextField
                      focusColor="black"
                      name="searchPhone"
                      label="Adapter Id"
                      //value={values.lastName}
                      fullWidth
                      onChange={(event) => {
                        setSearch({ ...search, adapterId: event.target.value });
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={2}>
                    <DatePicker
                      label="Datum od"
                      inputFormat="dd.MM.yyyy"
                      fullWidth
                      value={valueDateFrom}
                      onChange={(newValue) => {
                        setValueDateFrom(newValue);
                        setSearch({ ...search, dateFrom: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item md={2}>
                    <DatePicker
                      label="Datum do"
                      inputFormat="dd.MM.yyyy"
                      fullWidth
                      minDate={valueDateFrom}
                      value={valueDateTo}
                      onChange={(newValue) => {
                        setValueDateTo(newValue);
                        setSearch({ ...search, dateTo: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>

                  <Grid
                    style={{ marginTop: "10px", marginLeft: "1px" }}
                    container
                    spacing={4}
                  >
                    <Grid item md={2}>
                      <CssTextField
                        focusColor="black"
                        name="operator"
                        label="Operator"
                        value={operatorValue}
                        //error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        onChange={(event) => {
                          setOperatorValue(event.target.value);
                          setSearch({
                            ...search,
                            operator: event.target.value,
                          });
                        }}
                        variant="outlined"
                        select
                      >
                        <MenuItem value={0}>Odaberite operatora</MenuItem>
                        {operatorsOptions.map((status) => (
                          <MenuItem
                            key={status.operatorName}
                            value={status.operatorName}
                          >
                            {status.operatorName}
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </Grid>

                    <Grid item md={2}>
                      <CssTextField
                        focusColor="black"
                        name="requestType"
                        label="Vrsta"
                        value={requestTypeValue}
                        //error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        onChange={(event) => {
                          setRequestTypeValue(event.target.value);
                          setSearch({
                            ...search,
                            type: event.target.value,
                          });
                        }}
                        variant="outlined"
                        select
                      >
                        <MenuItem value={0}>Odaberite vrstu</MenuItem>
                        {requestTypesOptions.map((status) => (
                          <MenuItem
                            key={status.requestTypeName}
                            value={status.requestTypeName}
                          >
                            {status.requestTypeDescription}
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </Grid>
                    <Grid item md={2}>
                      <CssTextField
                        focusColor="black"
                        name="category"
                        label="Kategorija"
                        value={categoryValue}
                        //error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        onChange={(event) => {
                          setCategoryValue(event.target.value);
                          setSearch({
                            ...search,
                            category: event.target.value,
                          });
                        }}
                        variant="outlined"
                        select
                      >
                        <MenuItem value={0}>Odaberite kategoriju</MenuItem>
                        {optionsCategory.map((status) => (
                          <MenuItem key={status.value} value={status.value}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </Grid>
                    <Grid item md={2}>
                      <CssTextField
                        focusColor="black"
                        name="status"
                        label="Status"
                        value={statusValue}
                        //error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        onChange={(event) => {
                          setStatusValue(event.target.value);
                          setSearch({
                            ...search,
                            status: event.target.value,
                          });
                        }}
                        variant="outlined"
                        select
                      >
                        <MenuItem value={0}>Odaberite status</MenuItem>
                        {optionsStatus.map((status) => (
                          <MenuItem key={status.value} value={status.value}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </Grid>
                    <Grid item md={2}>
                      <CssTextField
                        focusColor="black"
                        name="statusInt"
                        label="Status interno"
                        value={statusIntValue}
                        //error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        onChange={(event) => {
                          setStatusIntValue(event.target.value);
                          setSearch({
                            ...search,
                            statusInt: event.target.value,
                          });
                        }}
                        variant="outlined"
                        select
                      >
                        <MenuItem value={0}>Odaberite status interno</MenuItem>
                        {optionsStatusInt.map((status) => (
                          <MenuItem key={status.value} value={status.value}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              ""
            )}
          </Typography>
        </CardContent>
        <br />
        <Paper>
          <div style={{ width: "100%" }}>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <DataGrid
                disableColumnMenu
                getRowId={(r) => r.requestId}
                rows={faultOrders}
                rowsPerPageOptions={[5, 10, 15, 20]}
                columns={columns}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pageSize={pageSize}
                hideFooterSelectedRowCount
                autoHeight="true"
                componentsProps={{
                  pagination: {
                    labelRowsPerPage: "Redaka po stranici",
                  },
                }}
              />
            )}
          </div>
        </Paper>
      </Card>
    </>
  );
}

function DataGridPage() {
  return (
    <React.Fragment>
      <Helmet title="Smetnje" />
      <Typography variant="h3" gutterBottom display="inline">
        Smetnje
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Typography>Smetnje</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <DataGridDemo />
    </React.Fragment>
  );
}

export default DataGridPage;
