import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { useCustomMutation } from "@/hooks/useCustomMutation";

export function useGames(selectedGame) {
  const {
    data: games,
    isError,
    error,
    isLoading,
  } = useFetch("games", ENDPOINTS.games.root);

  const addGameMutation = useCustomMutation(ENDPOINTS.games.root, "post", [
    "games",
  ]);

  const updateGameMutation = useCustomMutation(
    ENDPOINTS.games.gameId(selectedGame?.id),
    "patch",
    "games"
  );

  const deleteGameMutation = useCustomMutation(
    ENDPOINTS.games.gameId(selectedGame?.id),
    "delete",
    "games"
  );


  return {
    games,
    isError,
    error,
    isLoading,
    addGameMutation,
    updateGameMutation,
    deleteGameMutation,
  };
}

