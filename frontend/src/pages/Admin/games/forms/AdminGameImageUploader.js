import React from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

const AdminGameImageUploader = ({ onUpload, game }) => {
  const form = useForm({});
  const { register } = form;
  const [file, setFile] = useState(null);

  return (
    <>
      {!file ? (
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
      ) : (
        <>
          <Button
            component="label"
            variant="contained"
            sx={{ width: "100%", backgroundColor: "#4caf50" }}
            onClick={() => {
              onUpload(file, setFile, game.id);
            }}
            color="success"
          >
            Confirmer
          </Button>
        </>
      )}
    </>
  );
};

export default AdminGameImageUploader;
