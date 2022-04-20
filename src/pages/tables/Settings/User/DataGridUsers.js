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

  useEffect(() => {
    userService
      .getUsers()
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
          onClick={() => handleToDetail(params.row.ref)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          onClick={() => handleToUpdate(params.row.ref)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          onClick={() => handleToDelete(params.row.ref)}
        />,
      ],
    },
  ];

  const handleToDetail = (refDetail) => {
    alert("detail");
    // navigate(`/settings/users/details/${refDetail}`, {
    //   state: {
    //     userRef: refDetail,
    //   },
    // });
  };

  const handleToUpdate = (refUpdate) => {
    alert("update");
    // navigate(`/settings/users/update-user/${refUpdate}`, {
    //   state: {
    //     userRef: refUpdate,
    //   },
    // });
  };

  const handleToDelete = (refDelete) => {
    alert("delete");
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
                //onClick={() => navigate("/settings/users/add-user")}
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
