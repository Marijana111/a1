import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { makeStyles } from "@mui/styles";

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
  Select,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import HandleButtons from "../../components/Common/HandleButtons";
import CheckModal from "../../components/Common/CheckModal";
import { useNavigate } from "react-router-dom";

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

const columns = [
  { field: "id", headerName: "Case Id", width: 105 },
  {
    field: "firstName",
    headerName: "GUID",
    width: 180,
    sortable: false,
  },
  {
    field: "lastName",
    headerName: "Operator",
    width: 120,
  },
  {
    field: "fullName",
    headerName: "Vrsta",
    //type: "number",
    width: 110,
  },
  {
    field: "category",
    headerName: "Kategorija",
    //type: "number",
    width: 120,
    sortable: false,
  },
  // {
  //   field: "fullName",
  //   headerName: "Kategorija",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 250,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, "firstName") || ""} ${
  //       params.getValue(params.id, "lastName") || ""
  //     }`,
  // },
  {
    field: "adapterId",
    headerName: "Adapter Id",
    //type: "number",
    width: 130,
    sortable: false,
  },
  {
    field: "time",
    headerName: "Vrijeme",
    //type: "number",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    //type: "number",
    width: 130,
  },
];

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

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function DataGridDemo() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [update, setUpdate] = useState(new Date());

  const [checkModal, setCheckModal] = useState({
    title: "",
    text: "",
    show: false,
  });

  const handleToUpdate = () => {
    if (selectedItems.length !== 1) return false;
    alert("Update");
    // navigate(`/users/update-user`, {
    //   state: {
    //     userID: selectedItems,
    //   },
    // });
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
          ? "Jeste li sigurni da želite izbrisati zahtjev?"
          : "Jeste li sigurni da želite izbrisati zahtjeve?",
      title: "Brisanje zahtjeva",
    });
  };

  const handleCloseCheckModal = () => {
    setCheckModal({ show: false });
  };

  const confirmDelete = () => {
    setSelectedItems([]);
    setCheckModal({ show: false });
    setUpdate(new Date());
    navigate("/requests");
  };
  return (
    <>
      <Card mb={6}>
        <CardContent pb={1}>
          <Typography variant="h6" gutterBottom>
            <Grid container spacing={4}>
              <Grid item md={2}>
                <CssTextField
                  focusColor="black"
                  name="searchName"
                  label="Case Id"
                  //value={values.firstName}
                  //error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  //helperText={touched.firstName && errors.firstName}
                  //onBlur={handleBlur}
                  //onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={2}>
                <CssTextField
                  focusColor="black"
                  name="searchPhone"
                  label="GUID"
                  //value={values.lastName}
                  //error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  //helperText={touched.lastName && errors.lastName}
                  //onBlur={handleBlur}
                  //onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={2}>
                <CssTextField
                  focusColor="black"
                  name="searchPhone"
                  label="Adapter Id"
                  //value={values.lastName}
                  //error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  //helperText={touched.lastName && errors.lastName}
                  //onBlur={handleBlur}
                  //onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={2}>
                <FormControl>
                  <TextField
                    style={{ width: "152px" }}
                    className={classes.root}
                    //value={age}
                    //onChange={(e) => console.log("ee", e.target.value)}
                    variant="outlined"
                    label="Operator"
                    select
                  >
                    <MenuItem value={"Test 1"}>Operator 1</MenuItem>
                    <MenuItem value={"Test 2"}>Operator 2</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item md={2}>
                <FormControl>
                  <TextField
                    style={{ width: "152px", marginLeft: "-10px" }}
                    className={classes.root}
                    //value={age}
                    //onChange={(e) => console.log("ee", e.target.value)}
                    variant="outlined"
                    label="Vrsta"
                    select
                  >
                    <MenuItem value={"Test 1"}>Vrsta 1</MenuItem>
                    <MenuItem value={"Test 2"}>Vrsta 2</MenuItem>
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
              rows={rows}
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
  return (
    <React.Fragment>
      <Helmet title="Zahtjevi" />
      <Typography variant="h3" gutterBottom display="inline">
        Zahtjevi
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/home">
          Naslovnica
        </Link>
        <Typography>Zahtjevi</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <DataGridDemo />
    </React.Fragment>
  );
}

export default DataGridPage;
