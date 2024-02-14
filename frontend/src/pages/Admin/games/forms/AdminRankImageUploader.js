import React from "react";
import { Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@mui/material";

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

const AdminRankImageUploader = ({ onUpload, rank }) => {
  const form = useForm({});
  const { register } = form;
  const [file, setFile] = useState(null);

  const handleFileChange = async (e, rankId) => {
    setFile(e.target.files[0]);
    await onUpload(e.target.files[0], setFile, rankId);
  };
  return (
    <>
      <label htmlFor={`upload-button-${rank.id}`}>
        <Avatar
          src={
            (rank.fileUrl && process.env.REACT_APP_API_URL + rank.fileUrl) ||
            "/reptile.jpg"
          }
          alt="Uploaded Image"
          sx={{ width: 50, height: 50 }}
        />
      </label>
      <VisuallyHiddenInput
        key={rank.id}
        id={`upload-button-${rank.id}`}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, rank.id)}
      />
    </>
  );
};

export default AdminRankImageUploader;
