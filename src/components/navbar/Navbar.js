import * as React from "react";
import styled, { withTheme } from "styled-components/macro";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
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
} from "@mui/material";

import { Close, Menu as MenuIcon } from "@mui/icons-material";

import NavbarNotificationsDropdown from "./NavbarNotificationsDropdown";
import NavbarMessagesDropdown from "./NavbarMessagesDropdown";
import NavbarLanguagesDropdown from "./NavbarLanguagesDropdown";
import NavbarUserDropdown from "./NavbarUserDropdown";
import { useNavigate } from "react-router-dom";

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
  const { t } = useTranslation();
  const [filteredData, setFilteredData] = React.useState([]);
  const [wordEntered, setWordEntered] = React.useState("");

  let data = [
    {
      name: "Zahtjevi",
      link: "/requests",
    },
    {
      name: "Smetnje",
      link: "/fault-orders",
    },
    {
      name: "Izvještaji",
      link: "/report-orders",
    },
  ];

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleClickItem = (link) => {
    setFilteredData([]);
    setWordEntered("");
    navigate(link);
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
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input placeholder="Pretraga" />
              </Search> */}
              <div className="search">
                <div className="searchInputs">
                  <Search>
                    <IconButton>
                      {filteredData.length === 0 ? (
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
                    {/* <SearchIconWrapper></SearchIconWrapper> */}
                    <Input
                      style={{ width: "350px" }}
                      placeholder="Pretraga"
                      value={wordEntered}
                      onChange={handleFilter}
                    />
                  </Search>

                  {/* <div className="searchIcon">
                    {filteredData.length === 0 ? (
                      <SearchIcon />
                    ) : (
                      <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                  </div> */}
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
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <List>
                <ListItem
                  className="dataItem"
                  target="_blank"
                  onClick={() => handleClickItem(value.link)}
                >
                  {value.name}
                </ListItem>
              </List>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default withTheme(Navbar);
