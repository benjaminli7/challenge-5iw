import React from "react";
import AdminGameForm from "./AdminGameForm";
import ENDPOINTS from "@/services/endpoints";
import { useCustomMutation } from "@/hooks/useCustomMutation";

function AdminGameUpdateForm({
  selectedGame,
  handleDialogClose,
}) {
  const updateGameMutation = useCustomMutation(ENDPOINTS.games.gameId(selectedGame.id), "patch", ["games"])
  const deleteGameMutation = useCustomMutation(
    ENDPOINTS.games.gameId(selectedGame.id),
    "delete",
    ["games"]
  );

  const onSubmit = async (data) => {
    try {
      await updateGameMutation.mutateAsync(data);
      await handleDialogClose();
    } catch (error) {
      console.error("Error updating game:", error);
    }
  }

  const handleDeleteGame = async () => {
    try {
      await deleteGameMutation.mutateAsync();
      await handleDialogClose();
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <AdminGameForm
      deleteGameMutation={deleteGameMutation}
      handleDeleteGame={handleDeleteGame}
      selectedGame={selectedGame}
      actionType="update"
      onSubmit={onSubmit}
    />
  );
}

export default AdminGameUpdateForm;
