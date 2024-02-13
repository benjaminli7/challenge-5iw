import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Typography,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%",
});

const InputFileUpload = ({
  ressource,
  handleImageUpload,
  handleDialogClose,
  type,
}) => {
  const [file, setFile] = useState(null);

  console.log(ressource);
  return (
    <Box
      sx={{
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <DialogTitle>Ajouter une image</DialogTitle>
      <DialogContent>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ width: "100%" }}
        >
          Ajouter une image
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              e.target.files[0] && setFile(e.target.files[0]);
            }}
          />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          component="label"
          variant="contained"
          onClick={() => {
            handleImageUpload(
              file,
              setFile,
              ressource,
              handleDialogClose,
              type
            );
          }}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Box>
  );
};

export default InputFileUpload;
