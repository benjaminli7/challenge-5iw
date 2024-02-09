import AdminRankForm from "@/pages/admin/games/forms/AdminRankForm";
import { useRanks } from "@/hooks/models/useRanks";

function AdminRankUpdateImageForm({ selectedRank, handleDialogClose }) {
  const { updateRankMutation, deleteRankMutation } = useRanks(selectedRank);

  const onSubmit = async (data) => {
    try {
      await updateRankMutation.mutateAsync(data);
      await handleDialogClose();
    } catch (error) {
      console.error("Error updating rank's image:", error);
    }
  };

  return (
    <AdminRankForm
      deleteRankMutation={deleteRankMutation}
      onSubmit={onSubmit}
      actionType="update"
      selectedRank={selectedRank}
    />
  );
}
export default AdminRankUpdateImageForm;
