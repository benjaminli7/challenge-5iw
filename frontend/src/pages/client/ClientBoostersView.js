import useFetch from "@/hooks/useFetch";
import MapWrapper from "@/pages/client/MapWrapper";
import ENDPOINTS from "@/services/endpoints";
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useState, useEffect } from "react";

function ClientBoostersView() {
  const [filters, setFilters] = useState({});

  const { data: players, isLoading: isLoadingPlayers, refetch } = useFetch(
    "players",
    `${ENDPOINTS.users.players}?`
  );
  const { data: teams, isLoading: isLoadingTeams } = useFetch(
    "teams",
    `${ENDPOINTS.teams.root}?isApproved=true`
  );
  const { data: games, isLoading: isLoadingGames } = useFetch(
    "games",
    ENDPOINTS.games.root
  );
  useEffect(() => {
    console.log(filters)
    const newQueryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") {
        newQueryParams.append(key, value);
      }
    });
    refetch()
  }, [filters])

  if (isLoadingPlayers || isLoadingTeams || isLoadingGames)
    return <div>Loading...</div>;



  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Liste des filtres
      </Typography>
      <Box
        sx={{ display:"flex",flexDirection: { xs: "column", sm: "row" }, justifyContent: "center", alignItems: "center", gap: 1}}
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
        <Grid item xs={12} sm={6} rowGap={3} sx={{height: "70vh", overflowY: "scroll"}}>
          {players.map((player, index) => (
            <Fragment key={index}>
              <Stack direction="row" spacing={3} alignItems="center" py={1}>
                <Avatar />
                <Stack>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {player.team.name}
                  </Typography>
                  <Typography>
                    {player.firstName} '{player.username}' {player.lastName}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
            </Fragment>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <MapWrapper />
        </Grid>
      </Grid>
    </div>
  );
}

export default ClientBoostersView;
