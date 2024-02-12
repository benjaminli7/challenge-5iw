import React from "react";
import { Box, Card, Typography, IconButton, Avatar, Icon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import ImageIcon from "@mui/icons-material/Image";

function AdminRankItem({
  rank,
  handleActionType,
  setSelectedRank,
  ACTION_TYPES,
}) {
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
          title={rank.name}
        ></Avatar>

        <IconButton
          color="primary"
          aria-label="edit rank"
          onClick={() => {
            handleActionType(ACTION_TYPES.EDIT_RANK_IMAGE);
            setSelectedRank(rank);
          }}
        >
          {" "}
          <ImageIcon />
        </IconButton>
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
