import React from 'react'
import { Paper, Stack, Avatar, Typography } from '@mui/material';

function ClientBoosterDetailInfos({ player }) {
  return (
    <Paper elevation={2} sx={{ minWidth: "250px", height: {xs: "100%", sm: "80vh"}, p: 3 }}>
      <Stack direction="column" spacing={3} alignItems="center">
        <Avatar sx={{ width: 150, height: 150 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {player.team.name}
        </Typography>
        <Typography variant="subtitle" sx={{ fontWeight: "bold" }}>
          {player.username}
        </Typography>
        <Typography variant="subtitle">
          {player.firstName} {player.lastName}
        </Typography>
        <Typography variant="subtitle">{player.discord}</Typography>
        <Typography variant="subtitle">
          {player.taux_horaire} coins/h
        </Typography>
      </Stack>
    </Paper>
  );
}

export default ClientBoosterDetailInfos