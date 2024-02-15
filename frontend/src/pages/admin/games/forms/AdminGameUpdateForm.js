import React from "react";
import AdminGameForm from "@/pages/admin/games/forms/AdminGameForm";
import { useGames } from "@/hooks/models/useGames";
import { toast } from "sonner";

function AdminGameUpdateForm({ selectedGame, handleDialogClose }) {
  const { updateGameMutation, deleteGameMutation } = useGames(selectedGame);

  const onSubmit = async (data) => {
    try {
      await updateGameMutation.mutateAsync(data);
      await handleDialogClose();
      toast.success("Game updated successfully");
    } catch (error) {
      console.error("Error updating game:", error);
      toast.error("Error updating game");
    }
  };

  const handleDeleteGame = async () => {
    try {
      await deleteGameMutation.mutateAsync();
      await handleDialogClose();
      toast.success("Game deleted successfully");
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("Error deleting game");
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
