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
  LinearProgress,
  Chip as MuiChip,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { spacing } from "@mui/system";
import HandleButtons from "../../components/Common/HandleButtons";
import CheckModal from "../../components/Common/CheckModal";
import { useNavigate } from "react-router-dom";
import { requestService } from "../../Services/requestService";
import { RemoveRedEye } from "@mui/icons-material";
import { green, orange, red, grey } from "@mui/material/colors";

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

function DataGridDemo() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [update, setUpdate] = useState(new Date());
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [checkModal, setCheckModal] = useState({
    title: "",
    text: "",
    show: false,
  });

  useEffect(() => {
    requestService
      .getRequests()
      .then((res) => {
        setRequests(res.data.requestList);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "requestId", headerName: "Case Id", width: 105 },
    {
      field: "requestGuid",
      headerName: "GUID",
      width: 310,
      sortable: false,
    },
    {
      field: "operatorName",
      headerName: "Operator",
      width: 150,
    },
    {
      field: "requestType",
      headerName: "Vrsta",
      //type: "number",
      width: 120,
    },
    {
      field: "requestCategory",
      headerName: "Kategorija",
      //type: "number",
      width: 170,
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
      field: "requestDateInsert",
      headerName: "Vrijeme",
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      width: 180,
    },
    {
      field: "statusName",
      headerName: "Status",
      //type: "number",
      width: 130,
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
      //type: "number",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Akcije",
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

  const handleToUpdate = () => {
    if (selectedItems.length !== 1) return false;
    alert("Update");
    // navigate(`/users/update-user`, {
    //   state: {
    //     userID: selectedItems,
    //   },
    // });
  };

  const handleToDetail = (id) => {
    // if (selectedItems.length !== 1) return false;
    // navigate(`/requests/details/${selectedItems}`, {
    //   state: {
    //     requestId: selectedItems,
    //   },
    // });

    navigate(`/requests/details/${id}`, {
      state: {
        requestId: id,
      },
    });
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
            {isLoading ? (
              <LinearProgress />
            ) : (
              <DataGrid
                disableColumnMenu
                rowsPerPageOptions={[5, 10, 25]}
                getRowId={(r) => r.requestId}
                rows={requests}
                columns={columns}
                pageSize={5}
                checkboxSelection
                hideFooterSelectedRowCount
                onSelectionModelChange={(ids) => {
                  setSelectedItems(ids);
                }}
              />
            )}
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
