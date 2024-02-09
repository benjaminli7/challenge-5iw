import React from "react";
import { Box, Card, Typography, IconButton, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function AdminRankItem({
  rank,
  handleActionType,
  setSelectedRank,
  ACTION_TYPES,
}) {
  console.log(rank);
  return (
    <Card key={rank.id} variant="outlined" sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography key={rank.id} variant="body1">
          {rank.name}
        </Typography>
        <Avatar
          src={rank.fileUrl && process.env.REACT_APP_API_URL + rank.fileUrl}
          alt={rank.name}
          sx={{ width: 50, height: 50 }}
        />
        <IconButton
          color="primary"
          aria-label="edit rank"
          onClick={() => {
            handleActionType(ACTION_TYPES.EDIT_RANK);
            setSelectedRank(rank);
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

export default AdminRankItem;
