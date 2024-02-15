import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  CardMedia,
  IconButton,
} from "@mui/material";
import AdminRankItem from "@/pages/admin/games/AdminRankItem";
import EditIcon from "@mui/icons-material/Edit";


export default function AdminGamesList({
  games,
  setSelectedGame,
  setSelectedRank,
  handleActionType,
  ACTION_TYPES,
}) {
  return (
    <Grid container spacing={4}>
      {games?.map((game) => (
        <Grid item key={game.id} xs={12} md={6} lg={4}>
          <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
            {/* <CardMedia
              sx={{ height: 300 }}
              image={
                (game.fileUrl &&
                  process.env.REACT_APP_API_URL + game.fileUrl) ||
                "/reptile.jpg"
              }
              title={game.title}
            ></CardMedia> */}
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6">{game.name}</Typography>
                <IconButton
                  color="primary"
                  aria-label="edit game"
                  onClick={() => {
                    handleActionType(ACTION_TYPES.EDIT_GAME);
                    setSelectedGame(game);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Stack>
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
                    handleActionType(ACTION_TYPES.CREATE_RANK);
                    setSelectedGame(game);
                  }}
                >
                  Add rank
                </Button>
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleActionType(ACTION_TYPES.EDIT_IMAGE);
                    setSelectedGame(game);
                  }}
                >
                  Image
                </Button> */}
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
