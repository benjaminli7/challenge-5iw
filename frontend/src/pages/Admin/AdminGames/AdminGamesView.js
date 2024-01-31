import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Button, Dialog, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import AdminGamesList from "@/pages/Admin/AdminGames/AdminGamesList";
import AdminGameCreateForm from "@/pages/Admin/AdminGames/forms/AdminGameCreateForm";
import AdminRankCreateForm from "@/pages/Admin/AdminGames/forms/AdminRankCreateForm";
import useActionHandlers from "@/hooks/useActionHandlers";
import AdminGameUpdateForm from "@/pages/Admin/AdminGames/forms/AdminGameUpdateForm";
import AdminRankUpdateForm from "@/pages/Admin/AdminGames/forms/AdminRankUpdateForm";

function AdminGamesView() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const {
    data: games,
    isError,
    error,
    isLoading,
  } = useFetch("games", ENDPOINTS.games.root);
  const { actionType, openDialog, handleDialogClose, handleActionType } =
    useActionHandlers();

  const ACTION_TYPES = {
    CREATE_GAME: "CREATE_GAME",
    EDIT_GAME: "EDIT_GAME",
    CREATE_RANK: "CREATE_RANK",
    EDIT_RANK: "EDIT_RANK",
  };

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
