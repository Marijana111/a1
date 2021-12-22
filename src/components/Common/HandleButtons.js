import React from "react";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const HandleButtons = ({
  handleDetail,
  handleUpdate,
  handleDelete,
  selectedItemsLength,
}) => {
  return (
    <div id="actions" className="mt-3 mb-3">
      {handleDetail && (
        <Button
          style={{
            marginRight: "7px",
          }}
          disabled={selectedItemsLength !== 1}
          onClick={handleDetail}
          variant="outlined"
          color="inherit"
        >
          <InfoIcon /> &nbsp; Detalji
        </Button>
      )}

      {handleUpdate && (
        <Button
          style={{ marginRight: "7px" }}
          disabled={selectedItemsLength !== 1}
          onClick={handleUpdate}
          variant="outlined"
          color="inherit"
        >
          <EditIcon /> &nbsp; Uredi
        </Button>
      )}

      {handleDelete && (
        <Button
          disabled={selectedItemsLength == 0}
          onClick={handleDelete}
          variant="outlined"
          color="inherit"
        >
          <DeleteIcon /> &nbsp; Izbriši
        </Button>
      )}
    </div>
  );
};

export default HandleButtons;
