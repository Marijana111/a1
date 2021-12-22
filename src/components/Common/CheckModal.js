import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const CheckModal = ({ text, show, handleClose, title, confirmAction }) => {
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 6, mb: 6 }}>
            {text}
          </Typography>
          <hr />
          <div style={{ marginTop: "12px" }}>
            <Button
              onClick={confirmAction}
              type="button"
              variant="contained"
              color="error"
              mt={3}
            >
              <DeleteIcon /> &nbsp; Izbriši
            </Button>
            &nbsp; &nbsp;
            <Button
              onClick={handleClose}
              style={{ backgroundColor: "black" }}
              type="button"
              variant="contained"
              mt={3}
            >
              Odustani
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckModal;
