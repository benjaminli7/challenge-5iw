import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Button, Dialog, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AdminGamesList from "./AdminGamesList";
import { useDialog } from "@/hooks/useDialog";
import AdminGameCreateForm from "./forms/AdminGameCreateForm";

function AdminGamesView() {
  const {
    data: games,
    isError,
    error,
    isLoading,
  } = useFetch("games", ENDPOINTS.games.root);
  const { open, handleOpen, handleClose } = useDialog();

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  // if (isLoading) return <CircularProgress />;

  return (
    <>
      <Button color="primary" onClick={handleOpen}>
        Open modal
      </Button>
      <AdminGamesList games={games} />
      <Dialog open={open} onClose={handleClose}>
        <AdminGameCreateForm handleClose={handleClose}/>
      </Dialog>
    </>
  );
}

export default AdminGamesView;
