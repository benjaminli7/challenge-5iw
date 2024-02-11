import { useUsers } from "@/hooks/models/useUsers";
import ManagerPlayerForm from "@/pages/manager/forms/ManagerPlayerForm";
import { toast } from "sonner";

function ManagerPlayerUpdateForm({ selectedUser, handleDialogClose, games }) {
  const { updateUserMutation, deleteUserMutation } = useUsers(
    selectedUser.id
  );
  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        assignedGame: `/api/games/${data.assignedGame}`,
      }
      await updateUserMutation.mutateAsync(dataToSend);
      await handleDialogClose();
      toast.success("Player updated!");
    } catch (error) {
      console.log(error)
      console.error("Error updating player:", error);
      toast.error("Error updating player");
    }
  };
  const handleDeletePlayer = async () => {
    try {
      await deleteUserMutation.mutateAsync();
      await handleDialogClose();
      toast.success("Player deleted from team!");
    } catch (error) {
      console.error("Error deleting player:", error);
      toast.error("Error deleting player");
    }
  };
  return (
    <ManagerPlayerForm
      deleteUserMutation={deleteUserMutation}
      actionType="update"
      selectedUser={selectedUser}
      onSubmit={onSubmit}
      handleDeletePlayer={handleDeletePlayer}
      games={games}
    />
  );
}

export default ManagerPlayerUpdateForm;
