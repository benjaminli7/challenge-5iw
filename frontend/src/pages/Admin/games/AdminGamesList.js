import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  CardMedia,
} from "@mui/material";
import AdminRankItem from "@/pages/admin/games/AdminRankItem";
import AdminGameImageUploader from "@/pages/admin/games/forms/AdminGameImageUploader";
import { httpPostMultiPart } from "@/services/api";
import ENDPOINTS from "@/services/endpoints";

export default function AdminGamesList({
  games,
  setSelectedGame,
  setSelectedRank,
  handleActionType,
  ACTION_TYPES,
}) {
  const handleImageUpload = async (data, setFile, gameId) => {
    try {
      const response = await httpPostMultiPart(
        ENDPOINTS.games.gameImg(gameId),
        data
      );
      // updateGamesList((prev) =>
      //   prev.map((game) => {
      //     if (game.id === response.data.id) {
      //       return response.data;
      //     }
      //     return game;
      //   })
      // );
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={4}>
      {games?.map((game) => (
        <Grid item key={game.id} xs={12} md={6} lg={4}>
          <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
            <CardMedia
              sx={{ height: 300 }}
              image={
                (game.fileUrl &&
                  process.env.REACT_APP_API_URL + game.fileUrl) ||
                "/reptile.jpg"
              }
              title={game.title}
            >
              <AdminGameImageUploader
                sx={{ backgroundColor: "white" }}
                onUpload={handleImageUpload}
                game={game}
              />
            </CardMedia>
            <Stack spacing={2}>
              <Typography variant="h6">{game.name}</Typography>
              {game.ranks.map((rank) => (
                <AdminRankItem
                  key={rank.id}
                  rank={rank}
                  handleActionType={handleActionType}
                  setSelectedRank={setSelectedRank}
                  ACTION_TYPES={ACTION_TYPES}
                />
              ))}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleActionType(ACTION_TYPES.EDIT_GAME);
                    setSelectedGame(game);
                  }}
                >
                  Edit game
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleActionType(ACTION_TYPES.CREATE_RANK);
                    setSelectedGame(game);
                  }}
                >
                  Add rank
                </Button>
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
