import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Button, Dialog, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import AdminGamesList from "./AdminGamesList";
import AdminGameCreateForm from "./forms/AdminGameCreateForm";
import AdminRankCreateForm from "./forms/AdminRankCreateForm";

import useActionHandlers from "@/hooks/useActionHandlers";
import AdminGameUpdateForm from "./forms/AdminGameUpdateForm";

function AdminGamesView() {
  const [selectedGame, setSelectedGame] = useState(null);
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
      </Dialog>
    </>
  );
}

export default AdminGamesView;
