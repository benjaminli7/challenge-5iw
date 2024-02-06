import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import GameCard from "./GameCard";
import CircularProgress from "@mui/material/CircularProgress";
import useFetch from "@/hooks/useFetch";
import SearchBar from "@/components/layout/user/SearchBar";
import ENDPOINTS from "@/services/endpoints";
import { Link, useLocation } from "react-router-dom";

const GameCardsView = () => {
  const { data: games, error } = useFetch("games", ENDPOINTS.games.root);
  const [loading, setLoading] = useState(true);
  const [gamesList, setGamesList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
    if (games) {
      setGamesList(games);
      setLoading(false);
    }
  }, [games, error]);

  // Filtered list based on the search value
  const filteredGamesList = gamesList.filter((game) =>
    game.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <SearchBar setSearchValue={setSearchValue} />

      {!loading ? (
        <div>
          <Grid container spacing={4}>
            {filteredGamesList.map((game) => (
              <Grid item key={game.id} xs={12} sm={6} md={4}>
                <Link to={`/games/${game.id}`}>
                  <GameCard game={game} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <Grid container justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      )}
    </>
  );
};

export default GameCardsView;
