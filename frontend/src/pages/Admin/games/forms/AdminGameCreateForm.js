import AdminGameForm from "@/pages/admin/games/forms/AdminGameForm";
import { useGames } from "@/hooks/models/useGames";

function AdminGameCreateForm({ handleDialogClose }) {
  const { addGameMutation } = useGames();
  const onSubmit = async (data) => {
    try {
      await addGameMutation.mutateAsync(data);
      await handleDialogClose();
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };
  return <AdminGameForm onSubmit={onSubmit} actionType="create" />;
}

export default AdminGameCreateForm;
