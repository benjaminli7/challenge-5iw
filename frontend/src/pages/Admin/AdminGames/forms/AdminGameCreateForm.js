import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";
import AdminGameForm from "./AdminGameForm";

function AdminGameCreateForm({ handleDialogClose }) {
  const addGameMutation = useCustomMutation(ENDPOINTS.games.root, "post", [
    "games",
  ]);

  const onSubmit = async (data) => {
    try {
      await addGameMutation.mutateAsync(data);
      await handleDialogClose();
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };
  return (
    <AdminGameForm
      onSubmit={onSubmit}
      actionType="create"
      handleDialogClose={handleDialogClose}
    />
  );
}

export default AdminGameCreateForm;
