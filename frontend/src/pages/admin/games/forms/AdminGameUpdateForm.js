import React from "react";
import AdminGameForm from "@/pages/admin/games/forms/AdminGameForm";
import { useGames } from "@/hooks/models/useGames";

function AdminGameUpdateForm({ selectedGame, handleDialogClose }) {
  const { updateGameMutation, deleteGameMutation } = useGames(selectedGame);

  const onSubmit = async (data) => {
    try {
      await updateGameMutation.mutateAsync(data);
      await handleDialogClose();
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

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
