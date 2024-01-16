import { useDialog } from "@/hooks/useDialog";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Button, Dialog, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AdminGamesList from "./AdminGamesList";
import AdminGameCreateForm from "./forms/AdminGameCreateForm";
import AdminRankCreateForm from "./forms/AdminRankCreateForm";

function AdminGamesView() {
  const {
    data: games,
    isError,
    error,
    isLoading,
  } = useFetch("games", ENDPOINTS.games.root);
  const { open, handleOpen, handleClose } = useDialog();

  const {
    open: openRank,
    handleOpen: handleOpenRank,
    handleClose: handleCloseRank,
  } = useDialog();

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        Open modal
      </Button>
      <AdminGamesList
        games={games}
        handleOpen={handleOpenRank}
        handleClose={handleCloseRank}
      />
      <Dialog open={open} onClose={handleClose}>
        <AdminGameCreateForm handleClose={handleClose} />
      </Dialog>
      <Dialog open={openRank} onClose={handleCloseRank}>
        <AdminRankCreateForm handleClose={handleCloseRank} />
      </Dialog>
    </>
  );
}

export default AdminGamesView;
