import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";
import AdminRankForm from "./AdminRankForm";

function AdminRankUpdateForm({ selectedRank, handleDialogClose }) {
  const updateRankMutation = useCustomMutation(
    ENDPOINTS.ranks.rankId(selectedRank.id),
    "patch",
    ["games"]
  );

  const deleteRankMutation = useCustomMutation(
    ENDPOINTS.ranks.rankId(selectedRank.id),
    "delete",
    ["games"]
  )

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
  }

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
