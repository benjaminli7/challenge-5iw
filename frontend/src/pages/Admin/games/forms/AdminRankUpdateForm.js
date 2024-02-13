import AdminRankForm from "@/pages/admin/games/forms/AdminRankForm";
import { useRanks } from "@/hooks/models/useRanks";

function AdminRankUpdateForm({ selectedRank, handleDialogClose }) {
  const { updateRankMutation, deleteRankMutation } = useRanks(selectedRank);

  const onSubmit = async (data) => {
    try {
      await updateRankMutation.mutateAsync(data);

      await handleDialogClose();
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  const handleDeleteRank = async () => {
    try {
      await deleteRankMutation.mutateAsync();
      await handleDialogClose();
    } catch (error) {
      console.error("Error deleting rank:", error);
    }
  };

  return (
    <AdminRankForm
      deleteRankMutation={deleteRankMutation}
      handleDeleteRank={handleDeleteRank}
      onSubmit={onSubmit}
      actionType="update"
      selectedRank={selectedRank}
    />
  );
}

export default AdminRankUpdateForm;
