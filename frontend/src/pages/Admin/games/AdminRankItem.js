import React from "react";
import { Box, Card, Typography, IconButton, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AdminRankImageUploader from "./forms/AdminRankImageUploader";
import { httpPostMultiPart } from "@/services/api";
import ENDPOINTS from "@/services/endpoints";

function AdminRankItem({
  rank,
  handleActionType,
  setSelectedRank,
  ACTION_TYPES,
}) {
  const handleImageUpload = async (data, setFile, rankId) => {
    try {
      // console.log({ data, setFile, rankId });
      const response = await httpPostMultiPart(
        ENDPOINTS.ranks.rankImg(rankId),
        data
      );
      // console.log(response);
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(rank);
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
        <AdminRankImageUploader onUpload={handleImageUpload} rank={rank} />
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
