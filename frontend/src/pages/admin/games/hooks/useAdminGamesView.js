import { useState } from "react";
import useActionHandlers from "@/hooks/useActionHandlers";
import { useGames } from "@/hooks/models/useGames";

export function useAdminGamesView() {
  const { games, isError, error, isLoading } = useGames();
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const { actionType, openDialog, handleDialogClose, handleActionType } =
    useActionHandlers();
  const ACTION_TYPES = {
    CREATE_GAME: "CREATE_GAME",
    EDIT_GAME: "EDIT_GAME",
    CREATE_RANK: "CREATE_RANK",
    EDIT_RANK: "EDIT_RANK",
    EDIT_IMAGE: "EDIT_IMAGE",
    EDIT_RANK_IMAGE: "RANK_IMAGE",
  };
  return {
    ACTION_TYPES,
    games,
    isError,
    error,
    isLoading,
    selectedGame,
    setSelectedGame,
    selectedRank,
    setSelectedRank,
    actionType,
    openDialog,
    handleDialogClose,
    handleActionType,
  };
}
