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
import {
  Check,
  Close,
  Delete,
  Edit,
  Loop as LoopIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { FilterList, RemoveRedEye } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { userService } from "../../../../Services/userService";
import * as dateHelper from "../../../../components/Config/DateHelper";
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

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TextField = styled(MuiTextField)(spacing);

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
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [userRefDelete, setUserRefDelete] = useState("");
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [update, setUpdate] = useState(new Date());
  const [isSuccessfull, setIsSuccessfull] = useState(true);
  const [openDialogResult, setOpenDialogResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    userService
      .getUsers()
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [update]);

  const reloadData = () => {
    setIsLoading(true);
    userService
      .getUsers()
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      field: "firstName",
      headerName: "Ime",
      width: 220,
    },
    {
      field: "lastName",
      headerName: "Prezime",
      width: 220,
    },
    {
      field: "email",
      headerName: "Email adresa",
      width: 250,
    },
    {
      field: "username",
      headerName: "Korisničko ime",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email adresa",
      width: 280,
    },
    {
      field: "createdDate",
      headerName: "Datum kreiranja",
      type: "dateTime",
      sortable: false,
      valueGetter: ({ value }) => value && dateHelper.formatUtcToDate(value),
      width: 200,
    },
    {
      field: "status",
      headerName: "Aktivan",
      width: 180,
      sortable: false,
      type: "actions",
      renderCell: (params) =>
        params.row.status == "ACTIVE" ? (
          <Check style={{ color: "green" }} />
        ) : (
          <Close style={{ color: "red" }} />
        ),
    },
    {
      field: "actions",
      headerName: "Akcije",
      sortable: false,
      type: "actions",
      width: 170,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<RemoveRedEye label="Detalji" />}
          onClick={() => handleToDetail(params.row.username)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          onClick={() => handleToUpdate(params.row.username)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          onClick={() => handleToDelete(params.row.ref)}
        />,
      ],
    },
  ];

  const handleToDetail = (usernameDetail) => {
    navigate(`/settings/users/details/${usernameDetail}`, {
      state: {
        username: usernameDetail,
      },
    });
  };

  const handleToUpdate = (usernameUpdate) => {
    navigate(`/settings/users/update-user/${usernameUpdate}`, {
      state: {
        username: usernameUpdate,
      },
    });
  };

  const handleToDelete = (refDelete) => {
    setUserRefDelete(refDelete);
    setIsOpenModalDelete(true);
  };

  const deleteUser = () => {
    userService
      .deleteUser(userRefDelete)
      .then((res) => {
        if (res.status == 200) {
          setIsSuccessfull(true);
        } else if (res.status !== 200) {
          setIsSuccessfull(false);
          setErrorMessage(res.statusText);
        }
        setIsLoading(false);
        setOpenDialogResult(true);
      })
      .catch((err) => console.log(err));
  };

  const handleCloseDialogDelete = () => {
    setIsOpenModalDelete(false);
    navigate("/settings/users");
  };

  const handleCloseDialogResult = () => {
    setIsOpenModalDelete(false);
    setOpenDialogResult(false);
    navigate("/settings/users");
    setUpdate(new Date());
  };

  return (
    <>
      <Card mb={6}>
        <CardContent pb={1}>
          <Typography variant="h6" gutterBottom>
            <SmallButton onClick={() => reloadData()} size="small" mr={2}>
              <LoopIcon style={{ color: "black" }} />
            </SmallButton>
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
                getRowId={(r) => r.ref}
                rows={users}
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
        PaperProps={{ sx: { width: "30%", height: "35%" } }}
        onClose={handleCloseDialogDelete}
        aria-labelledby="customized-dialog-title"
        open={isOpenModalDelete}
      >
        <DialogTitle>Brisanje korisnika</DialogTitle>
        <DialogContent
          dividers
          style={{ textAlign: "center", padding: "20px" }}
        >
          <br />
          <br />
          <span
            style={{
              fontSize: "17px",
            }}
          >
            Jeste li sigurni da želite izbrisati korisnika?
          </span>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={() => deleteUser()}
            mt={3}
          >
            Izbriši
          </Button>
          &nbsp; &nbsp;
          <Button
            onClick={handleCloseDialogDelete}
            style={{ backgroundColor: "black" }}
            type="button"
            variant="contained"
            mt={3}
          >
            Odustani
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        PaperProps={{ sx: { width: "30%", height: "40%" } }}
        onClose={handleCloseDialogResult}
        aria-labelledby="customized-dialog-title"
        open={openDialogResult}
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
                Uspješno ste izbrisali korisnika!
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
          <Button autoFocus onClick={handleCloseDialogResult}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

function DataGridPage() {
  const navigate = useNavigate();
  return (
    <>
      <React.Fragment>
        <Helmet title="Korisnici" />

        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              Korisnici
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/home">
                Naslovna
              </Link>
              <Typography>Postavke</Typography>
              <Typography>Korisnici</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <Button
                onClick={() => navigate("/settings/users/add-user")}
                variant="contained"
                type="button"
                color="error"
              >
                <AddIcon />
                Dodaj korisnika
              </Button>
            </div>
          </Grid>
        </Grid>

        <Divider my={6} />

        <DataGridDemo />
      </React.Fragment>
    </>
  );
}

export default DataGridPage;
