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
  Badge,
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
import { dailyListService } from "../../../Services/dailyListService";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TextField = styled(MuiTextField)(spacing);

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    color: "black",
    backgroundColor: "white",
    border: "1px solid black",
  },
});

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

  let Error;
  let Rejected;
  let Info;
  let Realized;
  let RealizedOK;
  let RealizedNOK;
  let Cancellation;

  const [update, setUpdate] = useState(new Date());
  const [faultOrders, setFaultOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCounut] = useState(0);
  const [countRejected, setCountRejected] = useState([]);
  const [countInfo, setCountInfo] = useState([]);
  const [countRealized, setCountRealized] = useState([]);
  const [countRealizedOK, setCountRealizedOK] = useState([]);
  const [countRealizedNOK, setCountRealizedNOK] = useState([]);
  const [countCancellation, setCountCancellation] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    dailyListService
      .getFaultOrders()
      .then((res) => {
        setTotalCounut(res.data.total);
        setFaultOrders(res.data.requestList);
        handleGetCount(res.data.requestList);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [update]);

  const handleGetCount = (requestsCount) => {
    Rejected = requestsCount.filter((r) => {
      return r.statusName.includes("ODBIJEN");
    });
    setCountRejected(Rejected);

    Info = requestsCount.filter((r) => {
      return r.statusName.includes("INFO");
    });
    setCountInfo(Info);

    Realized = requestsCount.filter((r) => {
      return r.statusName.includes("REALIZIRAN");
    });
    setCountRealized(Realized);

    RealizedOK = requestsCount.filter((r) => {
      return r.statusName.includes("REALIZIRAN OK");
    });
    setCountRealizedOK(RealizedOK);

    RealizedNOK = requestsCount.filter((r) => {
      return r.statusName.includes("REALIZIRAN NOK");
    });
    setCountRealizedNOK(RealizedNOK);

    Cancellation = requestsCount.filter((r) => {
      return r.statusName.includes("STORNO");
    });
    setCountCancellation(Cancellation);
  };

  const searchByStatus = (statusName) => {
    switch (statusName) {
      case "SVI":
        setUpdate(new Date());
        break;
      case "ODBIJEN":
        setFaultOrders(countRejected);
        break;
      case "INFO":
        setFaultOrders(countInfo);
        break;
      case "REALIZIRAN":
        setFaultOrders(countRealized);
        break;
      case "REALIZIRAN OK":
        setFaultOrders(countRealizedOK);
        break;
      case "REALIZIRAN NOK":
        setFaultOrders(countRealizedNOK);
        break;
      case "STORNO":
        setFaultOrders(countCancellation);
    }
  };

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
      field: "categoryName",
      headerName: "Kategorija",
      width: 170,
    },
    {
      field: "requestAdapterId",
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

  return (
    <>
      <Card mb={6}>
        <CardContent pb={1}>
          <Typography variant="h6" gutterBottom>
            <Grid style={{ marginTop: "5px" }} container spacing={2}>
              <StyledBadge badgeContent={totalCount}>
                <Button
                  onClick={() => searchByStatus("SVI")}
                  style={{ backgroundColor: "black" }}
                  type="button"
                  variant="contained"
                >
                  SVI
                </Button>
              </StyledBadge>
              <StyledBadge
                badgeContent={
                  countRejected.length > 0 ? countRejected.length : "0"
                }
              >
                <Button
                  onClick={() => searchByStatus("ODBIJEN")}
                  color="error"
                  type="button"
                  variant="contained"
                  ml={4}
                >
                  ODBIJEN
                </Button>
              </StyledBadge>
              <StyledBadge
                badgeContent={countInfo.length > 0 ? countInfo.length : "0"}
              >
                <Button
                  onClick={() => searchByStatus("INFO")}
                  style={{ backgroundColor: "#7a7d7b" }}
                  type="button"
                  variant="contained"
                  ml={4}
                >
                  INFO
                </Button>
              </StyledBadge>
              <StyledBadge
                badgeContent={
                  countRealized.length > 0 ? countRealized.length : "0"
                }
              >
                <Button
                  onClick={() => searchByStatus("REALIZIRAN")}
                  style={{ backgroundColor: "#3cbd67" }}
                  type="button"
                  variant="contained"
                  ml={4}
                >
                  REALIZIRAN
                </Button>
              </StyledBadge>
              <StyledBadge
                badgeContent={
                  countRealizedOK.length > 0 ? countRealizedOK.length : "0"
                }
              >
                <Button
                  onClick={() => searchByStatus("REALIZIRAN OK")}
                  style={{ backgroundColor: "#d2d9d3" }}
                  type="button"
                  variant="contained"
                  ml={4}
                >
                  REALIZIRAN OK
                </Button>
              </StyledBadge>
              <StyledBadge
                badgeContent={
                  countRealizedNOK.length > 0 ? countRealizedNOK.length : "0"
                }
              >
                <Button
                  onClick={() => searchByStatus("REALIZIRAN NOK")}
                  color="error"
                  type="button"
                  variant="contained"
                  ml={4}
                >
                  REALIZIRAN NOK
                </Button>
              </StyledBadge>
              <StyledBadge
                badgeContent={
                  countCancellation.length > 0 ? countCancellation.length : "0"
                }
              >
                <Button
                  onClick={() => searchByStatus("STORNO")}
                  style={{ backgroundColor: "#d2d9d3" }}
                  type="button"
                  variant="contained"
                  ml={4}
                >
                  STORNO
                </Button>
              </StyledBadge>

              <Grid style={{ marginTop: "20px" }} container spacing={4}>
                <StyledBadge fullWidth badgeContent={4}>
                  <Button
                    //onClick={() => navigate(-1)}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                    }}
                    type="button"
                    variant="contained"
                    ml={4}
                  >
                    TCC potreban termin
                  </Button>
                </StyledBadge>
                <StyledBadge badgeContent={4}>
                  <Button
                    //onClick={() => navigate(-1)}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                    }}
                    type="button"
                    variant="contained"
                    ml={4}
                  >
                    OpKo smetnja NOK
                  </Button>
                </StyledBadge>
                <StyledBadge badgeContent={4}>
                  <Button
                    //onClick={() => navigate(-1)}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                    }}
                    type="button"
                    variant="contained"
                    ml={4}
                  >
                    Čekanje na OpKo verifikaciju
                  </Button>
                </StyledBadge>
              </Grid>
            </Grid>
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
        Dnevna lista - Smetnje
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovna
        </Link>
        <Typography>Dnevna lista</Typography>
        <Typography>Smetnje</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <DataGridDemo />
    </React.Fragment>
  );
}

export default DataGridPage;
