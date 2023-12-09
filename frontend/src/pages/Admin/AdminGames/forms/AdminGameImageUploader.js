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

const AdminGameImageUploader = ({ onUpload }) => {
  const form = useForm({});
  const { register } = form;
  const [file, setFile] = useState(null);

  //   const handleImageUpload = (data) => {
  //     console.log(data);
  //     onUpload(data.image[0]);
  //   };

  return (
    <>
      {!file ? (
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ width: "100%" }}
        >
          Add Image
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
            sx={{ width: "100%" }}
            onClick={() => {
              onUpload(file, setFile);
            }}
          >
            Upload Image
          </Button>
        </>
      )}
    </>
  );
};

export default AdminGameImageUploader;
