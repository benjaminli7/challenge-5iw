import React from "react";
import AdminGameForm from "./AdminGameForm";
import { useForm } from "react-hook-form";
import ENDPOINTS from "@/services/endpoints";
import { httpPatch, isAdmin } from "@/services/api";

function AdminGameUpdateForm({ game, handleClose }) {
  const form = useForm({
    defaultValues: {
      name: game.name,
      id: game.id,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await httpPatch(ENDPOINTS.games.gameId(data.id), data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminGameForm form={form} onSubmit={onSubmit} handleClose={handleClose} />
  );
}

export default AdminGameUpdateForm;
