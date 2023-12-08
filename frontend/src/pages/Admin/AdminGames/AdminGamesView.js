import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AdminGamesModal from "./AdminGamesModal";
import AdminGameList from "./AdminGamesList";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

function AdminGamesView() {
  const { data: games, error } = useFetch("games", ENDPOINTS.games.root);
  const [loading, setLoading] = useState(true);
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    console.log("USE EFFECT ADMIN GAMES");
    if (error) {
      setLoading(false);
    }
    if (games) {
      setLoading(false);
      setGamesList(games);
    }
  }, [games, error]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // useEffect(() => {
  //   if (success) {
  //     setSuccess(false);
  //     window.location.reload();
  //   }
  // }, [success]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Gestion des jeux et des rangs
      </Typography>
      <Typography variant="h5" gutterBottom>
        Jeux
      </Typography>

      {loading ? (
        <Grid container justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <AdminGamesModal
            fullScreen={fullScreen}
            addToGamesList={setGamesList}
          />
          <AdminGameList games={gamesList} updateGamesList={setGamesList} />
        </>
      )}
    </>
  );
}

export default AdminGamesView;
