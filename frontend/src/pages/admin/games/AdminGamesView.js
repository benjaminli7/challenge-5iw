import InputFileUpload from "@/components/commons/InputFileUpload";
import Loader from "@/components/commons/Loader";
import AdminGamesList from "@/pages/admin/games/AdminGamesList";
import AdminGameCreateForm from "@/pages/admin/games/forms/AdminGameCreateForm";
import AdminGameUpdateForm from "@/pages/admin/games/forms/AdminGameUpdateForm";
import AdminRankCreateForm from "@/pages/admin/games/forms/AdminRankCreateForm";
import AdminRankUpdateForm from "@/pages/admin/games/forms/AdminRankUpdateForm";
import { useAdminGamesView } from "@/pages/admin/games/hooks/useAdminGamesView";
import { httpPostMultiPart } from "@/services/api";
import ENDPOINTS from "@/services/endpoints";
import { Button, Dialog, Typography } from "@mui/material";
import { useQueryClient } from "react-query";

function AdminGamesView() {
  const queryClient = useQueryClient();

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

  if (isLoading) return <Loader />;

  const handleImageUpload = async (
    data,
    setFile,
    ressource,
    handleDialogClose,
    type
  ) => {
    try {
      let response = null;
      // switch (type) {
      //   case "game_img":
      //     response = await httpPostMultiPart(
      //       ENDPOINTS.games.gameImg(ressource.id),
      //       data
      //     );
      //   case "rank_img":
      //     response = await httpPostMultiPart(
      //       ENDPOINTS.ranks.rankImg(ressource.id),
      //       data
      //     );
      if (type === "game_img") {
        response = await httpPostMultiPart(
          ENDPOINTS.games.gameImg(ressource.id),
          data
        );
        if (type === "rank_img") {
          response = await httpPostMultiPart(
            ENDPOINTS.ranks.rankImg(ressource.id),
            data
          );
        }
      }
      setFile(null);
      handleDialogClose();
      await queryClient.invalidateQueries("games");
    } catch (error) {
      console.log(error);
    }
  };

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
        {actionType === ACTION_TYPES.EDIT_RANK_IMAGE && (
          <InputFileUpload
            handleDialogClose={handleDialogClose}
            ressource={selectedRank}
            handleImageUpload={handleImageUpload}
            type={"rank_img"}
          />
        )}
        {actionType === ACTION_TYPES.EDIT_RANK && (
          <AdminRankUpdateForm
            handleDialogClose={handleDialogClose}
            selectedRank={selectedRank}
          />
        )}
        {actionType === ACTION_TYPES.EDIT_IMAGE && (
          <InputFileUpload
            handleDialogClose={handleDialogClose}
            ressource={selectedGame}
            handleImageUpload={handleImageUpload}
            type={"game_img"}
          />
        )}
      </Dialog>
    </>
  );
}

export default AdminGamesView;
