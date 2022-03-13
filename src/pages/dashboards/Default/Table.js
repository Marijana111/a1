import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { MoreVertical } from "react-feather";

import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  Menu,
  LinearProgress,
  Link,
} from "@mui/material";
import { spacing } from "@mui/system";
import * as dateHelper from "../../../components/Config/DateHelper";
import { useNavigate } from "react-router-dom";
import { homeService } from "../../../Services/homeService";
import { green, orange, red, grey } from "@mui/material/colors";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background: ${(props) => props.status == "REALIZIRAN" && green[500]};
  background: ${(props) => props.status == "PRIHVAĆEN" && orange[500]};
  background: ${(props) => props.status == "ODBIJEN" && red[500]};
  background: ${(props) => props.status == "STORNIRAN" && green[500]};
  background: ${(props) => props.status == "INITIAL" && green[500]};
  background: ${(props) => props.status == "INFO" && grey[500]};
  background: ${(props) => props.status == "REALIZIRAN_OK" && green[500]};
  background: ${(props) => props.status == "REALIZIRAN_NOK" && orange[500]};
  color: ${(props) => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

// Data
let id = 0;
function createData(name, start, end, state, assignee) {
  id += 1;
  return { id, name, start, end, state, assignee };
}

function DashboardTable() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [faultOrders, setFaultOrders] = useState([]);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [anchorMenuReq, setAnchorMenuReq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    homeService
      .getLastFiveRequests()
      .then((res) => {
        setRequests(res.data.requestList.slice(0, 5));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    homeService
      .getLastFiveFaultOrders()
      .then((res) => {
        setFaultOrders(res.data.requestList.slice(0, 5));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleMenuReq = (event) => {
    setAnchorMenuReq(event.currentTarget);
  };

  const closeMenuReq = () => {
    setAnchorMenuReq(null);
  };

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  return (
    <>
      <Card mb={6}>
        <CardHeader
          action={
            <>
              <IconButton
                aria-owns={
                  Boolean(anchorMenuReq) ? "menu-appbar-req" : undefined
                }
                aria-haspopup="true"
                onClick={toggleMenuReq}
                color="inherit"
                size="large"
              >
                <MoreVertical />
              </IconButton>
              <Menu
                id="menu-appbar-req"
                anchorEl={anchorMenuReq}
                open={Boolean(anchorMenuReq)}
                onClose={closeMenuReq}
              >
                <MenuItem
                  style={{ marginRight: "50px" }}
                  onClick={() => navigate(`/requests`)}
                >
                  Prikaži sve
                </MenuItem>
              </Menu>
            </>
          }
          title={<strong>Zadnji zahtjevi</strong>}
        />
        <Paper>
          <TableWrapper>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Case Id</TableCell>
                    <TableCell>GUID</TableCell>
                    <TableCell>Operator</TableCell>
                    <TableCell>Vrsta</TableCell>
                    <TableCell>Kategorija</TableCell>
                    <TableCell>Adapter Id</TableCell>
                    <TableCell>Vrijeme</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((row) => (
                    <TableRow key={row.requestId}>
                      <TableCell
                        style={{ cursor: "pointer" }}
                        component="th"
                        scope="row"
                        onClick={() =>
                          navigate(`/requests/details/${row.requestId}`, {
                            state: {
                              requestId: row.requestId,
                            },
                          })
                        }
                      >
                        <Link>{row.requestId}</Link>
                      </TableCell>
                      <TableCell>{row.requestGuid}</TableCell>
                      <TableCell>{row.operatorName}</TableCell>
                      <TableCell>{row.requestType}</TableCell>
                      <TableCell>{row.requestCategory}</TableCell>
                      <TableCell>
                        {row.adapterId ? row.adapterId : "/"}
                      </TableCell>
                      <TableCell>
                        {dateHelper.formatUtcToDate(row.requestDateInsert)}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Chip
                          size="small"
                          mr={1}
                          mb={1}
                          label={row.statusName}
                          status={row.statusName}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableWrapper>
        </Paper>
      </Card>

      <Card mb={6}>
        <CardHeader
          action={
            <>
              <IconButton
                aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={toggleMenu}
                color="inherit"
                size="large"
              >
                <MoreVertical />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorMenu}
                open={Boolean(anchorMenu)}
                onClose={closeMenu}
              >
                <MenuItem
                  style={{ marginRight: "50px" }}
                  onClick={() => navigate(`/fault-orders`)}
                >
                  Prikaži sve
                </MenuItem>
              </Menu>
            </>
          }
          title={<strong>Zadnje smetnje</strong>}
        />
        <Paper>
          <TableWrapper>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Case Id</TableCell>
                    <TableCell>GUID</TableCell>
                    <TableCell>Operator</TableCell>
                    <TableCell>Vrsta</TableCell>
                    <TableCell>Kategorija</TableCell>
                    <TableCell>Adapter Id</TableCell>
                    <TableCell>Vrijeme</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {faultOrders.map((row) => (
                    <TableRow key={row.requestId}>
                      <TableCell
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/fault-orders/details/${row.requestId}`, {
                            state: {
                              requestId: row.requestId,
                            },
                          })
                        }
                        component="th"
                        scope="row"
                      >
                        <Link>{row.requestId}</Link>
                      </TableCell>
                      <TableCell>{row.requestGuid}</TableCell>
                      <TableCell>{row.operatorName}</TableCell>
                      <TableCell>{row.requestType}</TableCell>
                      <TableCell>{row.requestCategory}</TableCell>
                      <TableCell>
                        {row.adapterId ? row.adapterId : "/"}
                      </TableCell>
                      <TableCell>
                        {dateHelper.formatUtcToDate(row.requestDateInsert)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          mr={1}
                          mb={1}
                          label={row.statusName}
                          status={row.statusName}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableWrapper>
        </Paper>
      </Card>
    </>
  );
}

export default DashboardTable;
