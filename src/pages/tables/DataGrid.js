import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Link,
  Paper as MuiPaper,
  Typography,
  Grid,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { userService } from "../../Services/userService";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function DataGridDemo() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
      .getUsers()
      .then((res) => {
        console.log("res", res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    // { field: "id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Ime i prezime",
      width: 250,
      //editable: true,
    },
    {
      field: "phone",
      headerName: "Telefon",
      width: 200,
      //editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      //editable: true,
    },
    {
      field: "username",
      headerName: "Korisničko ime",
      width: 200,
      //editable: true,
    },
    {
      field: "website",
      headerName: "Web",
      width: 200,
      //editable: true,
    },
  ];

  // const rows = [users
  // ];

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Filteri
        </Typography>
      </CardContent>
      <Paper>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            disableColumnMenu
            rowsPerPageOptions={[5, 10, 25]}
            rows={users}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </Paper>
    </Card>
  );
}

function DataGridPage() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Helmet title="Data Grid" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Korisnici
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Naslovnica
            </Link>
            <Typography>Korisnici</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <Button
              onClick={() => navigate("/users/add-user")}
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

      <Divider my={5} />

      <DataGridDemo />
    </React.Fragment>
  );
}

export default DataGridPage;
