import AdminRankForm from "@/pages/admin/games/forms/AdminRankForm";
import { useRanks } from "@/hooks/models/useRanks";

function AdminRankCreateForm({ handleDialogClose, selectedGame }) {
  const { addRankMutation } = useRanks();

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
    />
  );
}

export default AdminRankCreateForm;
