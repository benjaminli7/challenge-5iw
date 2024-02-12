import React from "react";
import { Grid } from '@mui/material';
import GameCard from "./GameCard";
import CircularProgress from "@mui/material/CircularProgress";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";

import ENDPOINTS from "@/services/endpoints";

const GameCardsView = () => {
  const { data: games, error } = useFetch("games", ENDPOINTS.games.root);
  const [loading, setLoading] = useState(true);
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
    if (games) {
      setLoading(false);
      setGamesList(games);
    }
  }, [games, error]);

  console.log(gamesList);

  // const gridStyles = useGridStyles();

  return (
    <>
      {!loading ? (
        <Grid container spacing={4}>
          {gamesList.map((game) => (
            <Grid
              item
              key={game.id}
              xs={12}
              sm={6}
              md={4}
            >
              <GameCard game={game} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      )}
    </>
  );
};

export default GameCardsView;
