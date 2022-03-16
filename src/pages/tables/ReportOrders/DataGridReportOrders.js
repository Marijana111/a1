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
import { reportOrdersService } from "../../../Services/reportOrdersService";
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
  const [reportOrders, setReportOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleFilters, setIsVisibleFilter] = useState(false);
  const [valueDateFrom, setValueDateFrom] = useState(null);
  const [valueDateTo, setValueDateTo] = useState(null);
  const [reportTypeValue, setReportTypeValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState(null);
  const [operatorsOptions, setOperatorsOptions] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [reloadData, setReloadData] = useState(false);
  const [search, setSearch] = useState({
    caseId: "",
    guid: "",
    operator: 0,
    type: 0,
    dateFrom: null,
    dateTo: null,
  });

  useEffect(() => {
    reportOrdersService
      .getReportOrders(
        search.caseId,
        search.guid,
        search.operator,
        search.type,
        search.dateFrom,
        search.dateTo
      )
      .then((res) => {
        setReportOrders(res.data.reportList);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    selectService
      .getOperators()
      .then((res) => {
        setOperatorsOptions(res.data);
      })
      .catch((err) => console.log(err));
  }, [reloadData]);

  const columns = [
    { field: "reportId", headerName: "Case Id", width: 105 },
    {
      field: "reportGuid",
      headerName: "GUID",
      width: 310,
    },
    {
      field: "operatorName",
      headerName: "Operator",
      width: 150,
    },
    {
      field: "reportType",
      headerName: "Vrsta",
      width: 120,
    },
    {
      field: "reportName",
      headerName: "Naziv",
      width: 240,
      sortable: false,
    },
    {
      field: "reportDateInsert",
      headerName: "Vrijeme",
      type: "dateTime",
      valueGetter: ({ value }) => value && dateHelper.formatUtcToDate(value),
      width: 190,
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
    navigate(`/report-orders/details/${id}`, {
      state: {
        reportId: id,
      },
    });
  };

  const reportTypeOptions = [
    { value: 10, name: "Izvještaj o dostupnim adresama" },
    { value: 11, name: "Izvještaj o dostupnosti po adresi" },
    { value: 12, name: "Provjera statusa usluge po oznaci priključka" },
    {
      value: 13,
      name: "Izvještaj o slobodnim kapacitetima po distribucijskom čvoru",
    },
    {
      value: 14,
      name: "Izvještaj o slobodnim kapacitetima po agregacijskoj točki",
    },
    { value: 15, name: "Izvještaj dohvat MAC adresa po oznaci priključka" },
    {
      value: 16,
      name: "Izvještaj dohvat dostupnih mjerenja po oznaci priključka",
    },
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
                      name="CaseID"
                      label="Case ID"
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
                      name="GUID"
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
                      name="operator"
                      label="Operator"
                      value={operatorValue}
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
                      <MenuItem>Odaberite operatora</MenuItem>
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
                      name="reportType"
                      label="Vrsta"
                      value={reportTypeValue}
                      //error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      onChange={(event) => {
                        setReportTypeValue(event.target.value);
                        setSearch({
                          ...search,
                          type: event.target.value,
                        });
                      }}
                      variant="outlined"
                      select
                    >
                      <MenuItem>Odaberite vrstu</MenuItem>
                      {reportTypeOptions.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </CssTextField>
                  </Grid>
                  <Grid
                    style={{ marginTop: "10px", marginLeft: "1px" }}
                    container
                    spacing={4}
                  >
                    <Grid item md={2}>
                      <DatePicker
                        label="Datum od"
                        inputFormat="dd.MM.yyyy"
                        fullWidth
                        value={valueDateFrom}
                        onChange={(newValue) => {
                          setValueDateFrom(newValue);
                          setSearch({
                            ...search,
                            dateFrom: dateHelper.formatUtcToDateApi(newValue),
                          });
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
                          setSearch({
                            ...search,
                            dateTo: dateHelper.formatUtcToDateApi(newValue),
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
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
                rowsPerPageOptions={[5, 10, 15, 20]}
                getRowId={(r) => r.reportId}
                rows={reportOrders}
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
      <Helmet title="Izvještaji" />
      <Typography variant="h3" gutterBottom display="inline">
        Izvještaji
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Typography>Izvještaji</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <DataGridDemo />
    </React.Fragment>
  );
}

export default DataGridPage;
