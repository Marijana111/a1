import * as React from "react";
import styled, { withTheme } from "styled-components/macro";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import "./search.css";

import {
  Grid,
  Hidden,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

import { Close, Menu as MenuIcon } from "@mui/icons-material";
import NavbarUserDropdown from "./NavbarUserDropdown";
import { useNavigate } from "react-router-dom";
import { requestService } from "../../Services/requestService";
import { faultOrdersService } from "../../Services/faultOrdersService";
import * as dateHelper from "../Config/DateHelper";
import { tableCellClasses } from "@mui/material/TableCell";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const CustomTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background: #233044;
    color: ${(props) => props.theme.palette.common.white};
    border-right: 1px solid black;
    padding: 5px;
    margin-top: 10px;
    height: 10px;
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    padding: 5px;
    border-right: 1px solid black;
    height: 13px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`;

const Navbar = ({ onDrawerToggle }) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = React.useState([]);
  const [wordEntered, setWordEntered] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisibleResults, setIsVisibleResults] = React.useState(false);
  const [detailsDirection, setDetailsDirection] = React.useState("");
  const [search, setSearch] = React.useState({
    caseId: "",
    guid: "",
    adapterId: "",
    dateFrom: null,
    dateTo: null,
    operator: 0,
    type: 0,
    category: 0,
    status: 0,
    statusInt: 0,
  });

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    if (searchWord === "") {
      setFilteredData([]);
      setWordEntered("");
      setIsVisibleResults(false);
    }
  };

  const searchRequestByParam = (param, wordEntered) => {
    setDetailsDirection("requestDetails");
    setIsVisibleResults(true);
    setIsLoading(true);
    if (param == 1) {
      requestService
        .getRequests(
          wordEntered,
          search.guid,
          search.adapterId,
          search.dateFrom,
          search.dateTo,
          search.operator,
          search.type,
          search.category,
          search.status,
          search.statusInt
        )
        .then((res) => {
          console.log("resss", res.data.requestList);
          setFilteredData(res.data.requestList);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (param == 2) {
      requestService
        .getRequests(
          search.caseId,
          wordEntered,
          search.adapterId,
          search.dateFrom,
          search.dateTo,
          search.operator,
          search.type,
          search.category,
          search.status,
          search.statusInt
        )
        .then((res) => {
          setFilteredData(res.data.requestList);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (param == 3) {
      requestService
        .getRequests(
          search.caseId,
          search.guid,
          wordEntered,
          search.dateFrom,
          search.dateTo,
          search.operator,
          search.type,
          search.category,
          search.status,
          search.statusInt
        )
        .then((res) => {
          setFilteredData(res.data.requestList);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const searchFaulrOrderByParam = (param, wordEntered) => {
    setDetailsDirection("faultOrdersDetails");
    setIsVisibleResults(true);
    setIsLoading(true);
    if (param == 1) {
      faultOrdersService
        .getFaultOrders(
          wordEntered,
          search.guid,
          search.adapterId,
          search.dateFrom,
          search.dateTo,
          search.operator,
          search.type,
          search.category,
          search.status,
          search.statusInt
        )
        .then((res) => {
          setFilteredData(res.data.requestList);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (param == 2) {
      faultOrdersService
        .getFaultOrders(
          search.caseId,
          wordEntered,
          search.adapterId,
          search.dateFrom,
          search.dateTo,
          search.operator,
          search.type,
          search.category,
          search.status,
          search.statusInt
        )
        .then((res) => {
          setFilteredData(res.data.requestList);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (param == 3) {
      faultOrdersService
        .getFaultOrders(
          search.caseId,
          search.guid,
          wordEntered,
          search.dateFrom,
          search.dateTo,
          search.operator,
          search.type,
          search.category,
          search.status,
          search.statusInt
        )
        .then((res) => {
          setFilteredData(res.data.requestList);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setIsVisibleResults(false);
  };

  const handleClickItemRequest = (link) => {
    setFilteredData([]);
    setWordEntered("");
    setIsVisibleResults(false);
    if (detailsDirection == "requestDetails") {
      navigate(`/requests/details/${link}`, {
        state: {
          requestId: link,
        },
      });
    } else if (detailsDirection == "faultOrdersDetails") {
      navigate(`/fault-orders/details/${link}`, {
        state: {
          requestId: link,
        },
      });
    }
  };

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item>
              <div className="search">
                <div className="searchInputs">
                  <Search>
                    <IconButton>
                      {wordEntered.length == 0 ? (
                        <SearchIcon
                          style={{
                            color: "black",
                          }}
                        />
                      ) : (
                        <Close
                          id="clearBtn"
                          style={{
                            color: "black",
                          }}
                          onClick={clearInput}
                        />
                      )}
                    </IconButton>
                    <Input
                      style={{ width: "550px" }}
                      placeholder="Pretraga"
                      value={wordEntered}
                      onChange={handleFilter}
                    />
                  </Search>
                </div>
              </div>
            </Grid>
            <Grid item xs />
            <Grid item>
              <NavbarUserDropdown />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {wordEntered.length != 0 && (
        <div className="dataResult">
          {isVisibleResults == false ? (
            <>
              <List>
                <ListItem target="_blank">
                  <strong>Zahtjevi</strong>
                </ListItem>
                <ListItem
                  className="dataItem"
                  target="_blank"
                  onClick={() => searchRequestByParam(1, wordEntered)}
                >
                  prema Case Id
                </ListItem>
                <ListItem
                  className="dataItem"
                  target="_blank"
                  onClick={() => searchRequestByParam(2, wordEntered)}
                >
                  prema GUID
                </ListItem>
                <ListItem
                  className="dataItem"
                  target="_blank"
                  onClick={() => searchRequestByParam(3, wordEntered)}
                >
                  prema Adapter Id
                </ListItem>
              </List>
              <List>
                <ListItem target="_blank">
                  <strong>Smetnje</strong>
                </ListItem>
                <ListItem
                  className="dataItem"
                  target="_blank"
                  onClick={() => searchFaulrOrderByParam(1, wordEntered)}
                >
                  prema Case Id
                </ListItem>
                <ListItem
                  className="dataItem"
                  target="_blank"
                  onClick={() => searchFaulrOrderByParam(2, wordEntered)}
                >
                  prema GUID
                </ListItem>
                <ListItem
                  className="dataItem"
                  target="_blank"
                  onClick={() => searchFaulrOrderByParam(3, wordEntered)}
                >
                  prema Adapter Id
                </ListItem>
              </List>
            </>
          ) : (
            <>
              {isLoading ? (
                <CircularProgress
                  style={{ marginLeft: "40%", marginTop: "50px" }}
                  color="inherit"
                />
              ) : (
                <Table>
                  {filteredData !== 0 ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <CustomTableCell>Case Id</CustomTableCell>
                          <CustomTableCell>Operator</CustomTableCell>
                          <CustomTableCell>Vrsta</CustomTableCell>
                          <CustomTableCell>Vrijeme</CustomTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((row) => (
                          <TableRow
                            className="tableRow"
                            onClick={() =>
                              handleClickItemRequest(row.requestId)
                            }
                            key={row.requestId}
                          >
                            <CustomTableCell component="th" scope="row">
                              {row.requestId}
                            </CustomTableCell>
                            <CustomTableCell>
                              {row.operatorName}
                            </CustomTableCell>
                            <CustomTableCell>{row.requestType}</CustomTableCell>
                            <CustomTableCell>
                              {dateHelper.formatUtcToDate(
                                row.requestDateInsert
                              )}
                            </CustomTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "20%",
                      }}
                    >
                      Nema rezultata.
                    </p>
                  )}
                </Table>
              )}
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default withTheme(Navbar);
