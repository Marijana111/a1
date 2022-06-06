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
import { Loop as LoopIcon, Check } from "@mui/icons-material";
import { spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { requestService } from "../../../Services/requestService";
import { FilterList, RemoveRedEye } from "@mui/icons-material";
import { green, orange, red, grey } from "@mui/material/colors";
import { DatePicker } from "@mui/lab";
import { faultOrdersService } from "../../../Services/faultOrdersService";
import * as dateHelper from "../../../components/Config/DateHelper";
import { dailyListService } from "../../../Services/dailyListService";
import Dialog from "@mui/material/Dialog";
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

  let Rejected;
  let Info;
  let Realized;
  let RealizedOK;
  let RealizedNOK;
  let Cancellation;
  let TCCnewTermin;
  let OpkoNOK;
  let OpkoVerification;

  const [update, setUpdate] = useState(new Date());
  const [faultOrders, setFaultOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCounut] = useState(0);
  const [countRejected, setCountRejected] = useState([]);
  const [countInfo, setCountInfo] = useState([]);
  const [countRealized, setCountRealized] = useState([]);
  const [countRealizedOK, setCountRealizedOK] = useState([]);
  const [countRealizedNOK, setCountRealizedNOK] = useState([]);
  const [countCancellation, setCountCancellation] = useState([]);
  const [countTCCnewTermin, setCountTCCnewTermin] = useState([]);
  const [countOpkoNOK, setCountOpkoNOK] = useState([]);
  const [countOpkoVerification, setCountOpkoVerification] = useState([]);
  const [isOpenModalDone, setIsOpenModalDone] = useState(false);
  const [idOrder, setIdOrder] = useState(0);

  useEffect(() => {
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

    TCCnewTermin = requestsCount.filter((r) => {
      return r.internalStatusName.includes("TCC potreban termin");
    });
    setCountTCCnewTermin(TCCnewTermin);

    OpkoNOK = requestsCount.filter((r) => {
      return r.internalStatusName.includes("OpKo smetnja NOK");
    });
    setCountOpkoNOK(OpkoNOK);

    OpkoVerification = requestsCount.filter((r) => {
      return r.internalStatusName.includes("Čekanje na OpKo verifikaciju");
    });
    setCountOpkoVerification(OpkoVerification);
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
        break;
      case "TCC potreban termin":
        setFaultOrders(countTCCnewTermin);
        break;
      case "OpKo smetnja NOK":
        setFaultOrders(countOpkoNOK);
        break;
      case "Čekanje na OpKo verifikaciju":
        setFaultOrders(countOpkoVerification);
        break;
    }
  };

  const columns = [
    {
      field: "requestId",
      headerName: "Case Id",
      width: 105,
      renderCell: (params) => (
        <Button
          onClick={() =>
            navigate(`/fault-orders/details/${params.id}`, {
              state: {
                requestId: params.id,
              },
            })
          }
          type="button"
        >
          {params.id}
        </Button>
      ),
    },
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
      field: "internalStatusName",
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
        <GridActionsCellItem
          icon={<Check />}
          onClick={() => {
            setIsOpenModalDone(true);
            setIdOrder(params.id);
          }}
        />,
      ],
    },
  ];

  const handleUpdateBackOfficeAction = () => {
    dailyListService
      .confirmOrder(idOrder)
      .then((res) => {
        setUpdate(new Date());
        navigate("/daily-list/fault-orders");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpenModalDone(false);
    navigate("/daily-list/fault-orders");
    setUpdate(new Date());
  };

  const handleCloseDialogDone = () => {
    setIsOpenModalDone(false);
    navigate("/daily-list/fault-orders");
  };

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
              <StyledBadge badgeContent={countRejected.length}>
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
              <StyledBadge badgeContent={countInfo.length}>
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
              <StyledBadge badgeContent={countRealized.length}>
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
              <StyledBadge badgeContent={countRealizedOK.length}>
                <Button
                  onClick={() => searchByStatus("REALIZIRAN OK")}
                  style={{ backgroundColor: "#3cbd67" }}
                  type="button"
                  variant="contained"
                  ml={4}
                >
                  REALIZIRAN OK
                </Button>
              </StyledBadge>
              <StyledBadge badgeContent={countRealizedNOK.length}>
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
              <StyledBadge badgeContent={countCancellation.length}>
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
                <StyledBadge fullWidth badgeContent={countTCCnewTermin.length}>
                  <Button
                    onClick={() => searchByStatus("TCC potreban termin")}
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
                <StyledBadge badgeContent={countOpkoNOK.length}>
                  <Button
                    onClick={() => searchByStatus("OpKo smetnja NOK")}
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
                <StyledBadge badgeContent={countOpkoVerification.length}>
                  <Button
                    onClick={() =>
                      searchByStatus("Čekanje na OpKo verifikaciju")
                    }
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

      <BootstrapDialog
        PaperProps={{ sx: { width: "20%", height: "20%" } }}
        onClose={handleCloseDialogDone}
        aria-labelledby="customized-dialog-title"
        open={isOpenModalDone}
      >
        <DialogContent
          dividers
          style={{ textAlign: "center", padding: "20px", fontSize: "20px" }}
        >
          Smetnja odrađena?
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={() => handleUpdateBackOfficeAction()}
            mt={3}
          >
            Potvrdi
          </Button>
          &nbsp; &nbsp;
          <Button
            onClick={handleCloseDialogDone}
            style={{ backgroundColor: "black" }}
            type="button"
            variant="contained"
            mt={3}
          >
            Odustani
          </Button>
        </DialogActions>
      </BootstrapDialog>
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
