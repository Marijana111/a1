import React from "react";
import styled from "styled-components/macro";
import * as dateHelper from "../../../components/Config/DateHelper";

import { Button as MuiButton, Menu, MenuItem } from "@mui/material";
import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;

  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

function Actions() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <SmallButton size="small" mr={2}>
        <LoopIcon style={{ color: "black" }} />
      </SmallButton>
      <Button
        style={{ color: "white", backgroundColor: "black" }}
        variant="contained"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        disabled
      >
        {dateHelper.formatUtcToDateNoTime(new Date())}
      </Button>
    </React.Fragment>
  );
}

export default Actions;
