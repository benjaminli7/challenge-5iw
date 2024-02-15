import AdminRankForm from "@/pages/admin/games/forms/AdminRankForm";
import { useRanks } from "@/hooks/models/useRanks";
import { toast } from "sonner";

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
      toast.success("Rank created successfully");
    } catch (error) {
      console.error("Error creating rank:", error);
      toast.error("Error creating rank");
    }
  };
  return <AdminRankForm onSubmit={onSubmit} actionType="create" />;
}

export default AdminRankCreateForm;
