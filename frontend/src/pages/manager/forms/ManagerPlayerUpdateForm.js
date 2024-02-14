import { useUsers } from "@/hooks/models/useUsers";
import ManagerPlayerForm from "@/pages/manager/forms/ManagerPlayerForm";
import { toast } from "sonner";
import { useState } from "react";

function ManagerPlayerUpdateForm({ selectedUser, handleDialogClose, games }) {
  const { updateUserMutation, deleteUserMutation } = useUsers(selectedUser.id);
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        lat: latLng.lat,
        lng: latLng.lng,
        assignedGame: `/api/games/${data.assignedGame}`,
      };
      await updateUserMutation.mutateAsync(dataToSend);
      await handleDialogClose();
      toast.success("Player updated!");
    } catch (error) {
      console.log(error);
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
      setLatLng={setLatLng}
    />
  );
}

export default ManagerPlayerUpdateForm;
