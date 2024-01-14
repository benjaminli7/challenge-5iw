import { useCustomMutation } from "@/hooks/usePost";
import AdminGameForm from "./AdminGameForm";
import ENDPOINTS from "@/services/endpoints";

function AdminGameCreateForm({ handleClose }) {
  const onSubmit = async (data) => {
    try {
      const { mutateAsync: addGameMutation} = useCustomMutation(ENDPOINTS.games.root, data, "games");
      await addGameMutation();
      console.log("game created")
    } catch (e) {
      console.log(e);
    }
  };
  return <AdminGameForm onSubmit={onSubmit} actionType="create" handleClose={handleClose} />;
}

export default AdminGameCreateForm;
