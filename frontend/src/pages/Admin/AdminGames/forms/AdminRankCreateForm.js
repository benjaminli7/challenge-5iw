import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";
import AdminRankForm from "./AdminRankForm";

function AdminRankCreateForm({ handleDialogClose, selectedGame }) {
  const addRankMutation = useCustomMutation(ENDPOINTS.ranks.root, "post", [
    "games",
  ]);

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        game: `/api/games/${selectedGame.id}`,
      };
      await addRankMutation.mutateAsync(dataToSend);
      await handleDialogClose();
    } catch (error) {
      console.error("Error creating rank:", error);
    }
  };
  return (
    <AdminRankForm
      onSubmit={onSubmit}
      actionType="create"
      handleDialogClose={handleDialogClose}
    />
  );
}

export default AdminRankCreateForm;
