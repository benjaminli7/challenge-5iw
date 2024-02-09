import { Button, Dialog, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AdminGamesList from "@/pages/admin/games/AdminGamesList";
import AdminGameCreateForm from "@/pages/admin/games/forms/AdminGameCreateForm";
import AdminRankCreateForm from "@/pages/admin/games/forms/AdminRankCreateForm";
import AdminGameUpdateForm from "@/pages/admin/games/forms/AdminGameUpdateForm";
import AdminRankUpdateForm from "@/pages/admin/games/forms/AdminRankUpdateForm";
import AdminRankUpdateImage from "@/pages/admin/games/forms/AdminRankUpdateImage";
import { useAdminGamesView } from "@/pages/admin/games/hooks/useAdminGamesView";

function AdminGamesView() {
  const {
    ACTION_TYPES,
    games,
    isError,
    isLoading,
    error,
    selectedGame,
    setSelectedGame,
    selectedRank,
    setSelectedRank,
    actionType,
    openDialog,
    handleDialogClose,
    handleActionType,
  } = useAdminGamesView();

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleActionType(ACTION_TYPES.CREATE_GAME)}
        sx={{ mb: 3 }}
      >
        Add game
      </Button>
      <AdminGamesList
        games={games}
        setSelectedGame={setSelectedGame}
        setSelectedRank={setSelectedRank}
        handleActionType={handleActionType}
        ACTION_TYPES={ACTION_TYPES}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        {actionType === ACTION_TYPES.CREATE_GAME && (
          <AdminGameCreateForm handleDialogClose={handleDialogClose} />
        )}
        {actionType === ACTION_TYPES.EDIT_GAME && (
          <AdminGameUpdateForm
            handleDialogClose={handleDialogClose}
            selectedGame={selectedGame}
          />
        )}
        {actionType === ACTION_TYPES.CREATE_RANK && (
          <AdminRankCreateForm
            handleDialogClose={handleDialogClose}
            selectedGame={selectedGame}
          />
        )}
        {actionType === ACTION_TYPES.EDIT_RANK && (
          <AdminRankUpdateForm
            handleDialogClose={handleDialogClose}
            selectedRank={selectedRank}
          />
        )}
      </Dialog>
    </>
  );
}

export default AdminGamesView;
