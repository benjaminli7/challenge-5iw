import React from "react";
import AdminGameForm from "./AdminGameForm";
import { useForm } from "react-hook-form";
import { httpPost, isAdmin } from "@/services/api";
import ENDPOINTS from "@/services/endpoints";

function AdminGameCreateForm({ addToGamesList, handleClose }) {
  const form = useForm({});
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await httpPost(ENDPOINTS.games.root, data);
      addToGamesList((prev) => [...prev, response.data]);
      handleClose();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminGameForm onSubmit={onSubmit} form={form} handleClose={handleClose} />
  );
}

export default AdminGameCreateForm;
