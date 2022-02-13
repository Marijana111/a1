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
  TextField as MuiTextField,
  Select,
  MenuItem,
  FormControl as MuiFormControl,
  InputLabel,
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
import HandleButtons from "../../components/Common/HandleButtons";
import CheckModal from "../../components/Common/CheckModal";
import { makeStyles } from "@mui/styles";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TextField = styled(MuiTextField)(spacing);

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)`
  min-width: 148px;
`;

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

const useStyles = makeStyles({
  root: {
    width: 200,
    "& .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiInputLabel-root": {
      color: "secondary",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "secondary",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "black",
    },
    "&:hover .MuiInputLabel-root": {
      color: "secondary",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  },
});

function DataGridDemo() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [update, setUpdate] = useState(new Date());

  const [checkModal, setCheckModal] = useState({
    title: "",
    text: "",
    show: false,
  });

  useEffect(() => {
    userService
      .getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [update]);

  const handleToUpdate = () => {
    if (selectedItems.length !== 1) return false;
    //alert("Update");
    navigate(`/users/update-user`, {
      state: {
        userID: selectedItems,
      },
    });
  };

  const handleToDetail = () => {
    if (selectedItems.length !== 1) return false;
    alert("Detalji");
  };

  const handleToDelete = () => {
    if (selectedItems.length == 0) return false;
    setCheckModal({
      show: true,
      text:
        selectedItems.length == 1
          ? "Jeste li sigurni da želite izbrisati korisnika?"
          : "Jeste li sigurni da želite izbrisati korisnike?",
      title: "Brisanje korisnika",
    });
  };

  const handleCloseCheckModal = () => {
    setCheckModal({ show: false });
  };

  const confirmDelete = () => {
    setSelectedItems([]);
    setCheckModal({ show: false });
    setUpdate(new Date());
    navigate("/users");
  };

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

  return (
    <>
      <Card mb={6}>
        <CardContent pb={1}>
          <Typography variant="h6" gutterBottom>
            <Grid container spacing={6}>
              <Grid item md={4}>
                <CssTextField
                  focusColor="black"
                  name="searchName"
                  label="Ime i prezime"
                  //value={values.firstName}
                  //error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  //helperText={touched.firstName && errors.firstName}
                  //onBlur={handleBlur}
                  //onChange={handleChange}
                  variant="outlined"
                  my={2}
                />
              </Grid>
              <Grid item md={4}>
                <CssTextField
                  focusColor="black"
                  name="searchPhone"
                  label="Telefon"
                  //value={values.lastName}
                  //error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  //helperText={touched.lastName && errors.lastName}
                  //onBlur={handleBlur}
                  //onChange={handleChange}
                  variant="outlined"
                  my={2}
                />
              </Grid>
              <Grid style={{ marginTop: "8px" }} item md={4}>
                <FormControl fullWidth>
                  <TextField
                    className={classes.root}
                    //value={age}
                    //onChange={(e) => console.log("ee", e.target.value)}
                    variant="outlined"
                    label="Tvrtka"
                    select
                  >
                    <MenuItem value={"Test 1"}>Test 1</MenuItem>
                    <MenuItem value={"Test 2"}>Test 2</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
        <div style={{ marginLeft: "15px" }}>
          <HandleButtons
            handleUpdate={handleToUpdate}
            handleDetail={handleToDetail}
            handleDelete={handleToDelete}
            selectedItemsLength={selectedItems.length}
          />
        </div>
        <br />
        <Paper>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              disableColumnMenu
              rowsPerPageOptions={[5, 10, 25]}
              rows={users}
              columns={columns}
              pageSize={5}
              checkboxSelection
              hideFooterSelectedRowCount
              onSelectionModelChange={(ids) => {
                setSelectedItems(ids);
                // const selectedIDs = new Set(ids);
                // const selectedRow = users.filter((row) =>
                //   selectedIDs.has(row.id)
                // );
              }}
            />
          </div>
        </Paper>
      </Card>

      <CheckModal
        show={checkModal.show}
        title={checkModal.title}
        text={checkModal.text}
        handleClose={handleCloseCheckModal}
        confirmAction={confirmDelete}
      />
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
    </>
  );
}

export default DataGridPage;
