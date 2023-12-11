import React from "react";
import AdminGameForm from "./AdminGameForm";
import { useForm } from "react-hook-form";
import ENDPOINTS from "@/services/endpoints";
import { httpPatch, isAdmin } from "@/services/api";

function AdminGameUpdateForm({ game, handleClose, updateGamesList }) {
  const form = useForm({
    defaultValues: {
      name: game.name,
      id: game.id,
    },
  });

  const handleImageUpload = async (data, setFile) => {
    try {
      // console.log(ENDPOINTS.games.gameImg(game.id));
      const response = await httpPostMultiPart(
        ENDPOINTS.games.gameImg(game.id),
        data
      );
      updateGamesList((prev) =>
        prev.map((game) => {
          if (game.id === response.data.id) {
            return response.data;
          }
          return game;
        })
      );
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await httpPatch(ENDPOINTS.games.gameId(data.id), data);
      updateGamesList((prev) =>
        prev.map((game) => {
          if (game.id === data.id) {
            return response.data;
          }
          return game;
        })
      );

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminGameForm form={form} onSubmit={onSubmit} handleClose={handleClose} />
  );
}

export default AdminGameUpdateForm;
