import AdminGameForm from "@/pages/admin/games/forms/AdminGameForm";
import { useGames } from "@/hooks/models/useGames";
import { toast } from "sonner";

function AdminGameCreateForm({ handleDialogClose }) {
  const { addGameMutation } = useGames();
  const onSubmit = async (data) => {
    try {
      await addGameMutation.mutateAsync(data);
      await handleDialogClose();
      toast.success("Game created successfully");
    } catch (error) {
      console.error("Error creating game:", error);
      toast.error("Error creating game");
    }
  };
  return <AdminGameForm onSubmit={onSubmit} actionType="create" />;
}

export default AdminGameCreateForm;
