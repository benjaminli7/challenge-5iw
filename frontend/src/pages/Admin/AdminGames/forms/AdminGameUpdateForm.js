import React from "react";
import AdminGameForm from "./AdminGameForm";
import { useForm } from "react-hook-form";
import ENDPOINTS from "@/services/endpoints";
import { httpPatch, isAdmin } from "@/services/api";
import { useCustomMutation } from "@/hooks/useCustomMutation";

function AdminGameUpdateForm({
  selectedGame,
  handleDialogClose,
}) {
  // const handleImageUpload = async (data, setFile) => {
  //   try {
  //     // console.log(ENDPOINTS.games.gameImg(game.id));
  //     const response = await httpPostMultiPart(
  //       ENDPOINTS.games.gameImg(game.id),
  //       data
  //     );
  //     updateGamesList((prev) =>
  //       prev.map((game) => {
  //         if (game.id === response.data.id) {
  //           return response.data;
  //         }
  //         return game;
  //       })
  //     );
  //     setFile(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateGameMutation = useCustomMutation(ENDPOINTS.games.gameId(selectedGame.id), "patch", ["games"])

  const onSubmit = async (data) => {
    try {
      await updateGameMutation.mutateAsync(data);
      await handleDialogClose();
    } catch (error) {
      console.error("Error updating game:", error);
    }
  }
  return (
    <AdminGameForm
      selectedGame={selectedGame}
      actionType="update"
      onSubmit={onSubmit}
      handleDialogClose={handleDialogClose}
    />
  );
}

export default AdminGameUpdateForm;
