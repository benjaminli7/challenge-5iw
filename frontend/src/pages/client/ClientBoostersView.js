import useFetch from "@/hooks/useFetch";
import MapWrapper from "@/pages/client/MapWrapper";
import ENDPOINTS from "@/services/endpoints";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ClientBoosterItemList from "@/pages/client/ClientBoosterItemList";

function ClientBoostersView() {
  const [filters, setFilters] = useState({});
  const [queryParams, setQueryParams] = useState(new URLSearchParams());

  const {
    data: players,
    isLoading: isLoadingPlayers,
    isFetching: isFetchingPlayers,
    refetch,
  } = useFetch("players", `${ENDPOINTS.users.players}?${queryParams}`);
  const { data: teams, isLoading: isLoadingTeams } = useFetch(
    "teams",
    `${ENDPOINTS.teams.root}?isApproved=true`
  );
  const { data: games, isLoading: isLoadingGames } = useFetch(
    "games",
    ENDPOINTS.games.root
  );
  useEffect(() => {
    const newQueryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") {
        newQueryParams.append(key, value);
      }
    });
    setQueryParams(newQueryParams);
  }, [filters]);

  useEffect(() => {
    refetch();
  }, [queryParams]);

  if (isLoadingPlayers || isLoadingTeams || isLoadingGames)
    return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Filters
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
        mb={3}
      >
        <FormControl fullWidth>
          <InputLabel id="team-label">Equipe</InputLabel>
          <Select
            labelId="team-label"
            id="team"
            value={filters.team || ""}
            label="Equipe"
            onChange={(e) => setFilters({ ...filters, team: e.target.value })}
          >
            <MenuItem value="">Toutes les équipes</MenuItem>
            {teams.map((team, index) => (
              <MenuItem key={index} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="game-label">Jeu</InputLabel>
          <Select
            labelId="game-label"
            id="game"
            value={filters.game || ""}
            label="Jeu"
            onChange={(e) => setFilters({ ...filters, game: e.target.value })}
          >
            <MenuItem value="">Tous les jeux</MenuItem>
            {games.map((game, index) => (
              <MenuItem key={index} value={game.id}>
                {game.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sm={6}
          rowGap={3}
          sx={{ height: "70vh", overflowY: "scroll" }}
        >
          {isFetchingPlayers ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              {players.map((player, index) => (
                <ClientBoosterItemList key={index} player={player} />
              ))}
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <MapWrapper />
        </Grid>
      </Grid>
    </div>
  );
}

export default ClientBoostersView;
