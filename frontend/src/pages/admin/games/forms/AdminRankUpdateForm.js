import AdminRankForm from "@/pages/admin/games/forms/AdminRankForm";
import { useRanks } from "@/hooks/models/useRanks";
import { toast } from "sonner";

function AdminRankUpdateForm({ selectedRank, handleDialogClose }) {
  const { updateRankMutation, deleteRankMutation } = useRanks(selectedRank);

  const onSubmit = async (data) => {
    try {
      await updateRankMutation.mutateAsync(data);
      await handleDialogClose();
      toast.success("Rank updated successfully");
    } catch (error) {
      console.error("Error updating rank:", error);
      toast.error("Error updating rank");
    }
  };

  const handleDeleteRank = async () => {
    try {
      await deleteRankMutation.mutateAsync();
      await handleDialogClose();
      toast.success("Rank deleted successfully");
    } catch (error) {
      console.error("Error deleting rank:", error);
      toast.error("Error deleting rank");
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
