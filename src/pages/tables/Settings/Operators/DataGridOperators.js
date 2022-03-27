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
import { Check, Close, Edit, Loop as LoopIcon } from "@mui/icons-material";
import { spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { FilterList, RemoveRedEye } from "@mui/icons-material";
import { operatorsService } from "../../../../Services/operatorsService";
import AddIcon from "@mui/icons-material/Add";

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
  const [operators, setOperators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    operatorsService
      .getOperators()
      .then((res) => {
        setOperators(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const reloadData = () => {
    setIsLoading(true);
    operatorsService
      .getOperators()
      .then((res) => {
        setOperators(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      field: "operatorReferenceId",
      headerName: "OIB",
      width: 220,
      sortable: false,
    },
    {
      field: "operatorName",
      headerName: "Naziv",
      width: 220,
    },
    {
      field: "typeNNA",
      headerName: "Najam niti",
      width: 250,
      sortable: false,
      type: "actions",
      renderCell: (params) => getTypeNNA(params.row.operatorRequestTypes),
    },
    {
      field: "typeBSNA",
      headerName: "Bitstream",
      width: 250,
      sortable: false,
      type: "actions",
      renderCell: (params) => getTypeBSNA(params.row.operatorRequestTypes),
    },
    {
      field: "actions",
      headerName: "Akcije",
      sortable: false,
      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<RemoveRedEye label="Detalji" />}
          onClick={() => handleToDetail(params.operatorRef)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          onClick={() => console.log("edit")}
        />,
      ],
    },
  ];

  const getTypeNNA = (typeList) => {
    if (typeList.filter((e) => e.requestType.type === "NNA").length > 0) {
      return <Check style={{ color: "green" }} />;
    } else {
      return <Close style={{ color: "red" }} />;
    }
  };

  const getTypeBSNA = (typeList) => {
    if (typeList.filter((e) => e.requestType.type === "BSNA").length > 0) {
      return <Check style={{ color: "green" }} />;
    } else {
      return <Close style={{ color: "red" }} />;
    }
  };

  const handleToDetail = (id) => {
    navigate(`/requests/details/${id}`, {
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
                getRowId={(r) => r.operatorRef}
                rows={operators}
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
        <Helmet title="Operatori" />

        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              Operatori
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/home">
                Naslovna
              </Link>
              <Typography>Postavke</Typography>
              <Typography>Operatori</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <Button
                onClick={() => navigate("/settings/operators/add-operator")}
                variant="contained"
                type="button"
                color="error"
              >
                <AddIcon />
                Dodaj operatora
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
