import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { Dialog } from "@mui/material";
import AdminRankForm from "./forms/AdminRankForm";
import AdminGameUpdateForm from "./forms/AdminGameUpdateForm";
import ENDPOINTS from "@/services/endpoints";
import LoadingButton from "@mui/lab/LoadingButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AdminGameImageUploader from "./forms/AdminGameImageUploader";
import { useForm, useFieldArray } from "react-hook-form";
import { Divider } from "@mui/material";

import {
  httpPost,
  httpPatch,
  httpDelete,
  isAdmin,
  httpPostMultiPart,
} from "@/services/api";
import { MpTwoTone } from "@mui/icons-material";

export default function AdminGameCard({ game, updateGamesList }) {
  const [actionType, setActionType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [actionRankLoading, setActionRankLoading] = React.useState(false);

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [initialRankValues, setInitialRankValues] = useState({
    name: "",
    id: "",
  });
  const handleClickEdit = (rankName, rankId) => {
    setOpen(true);
    setActionType("edit");
    setInitialRankValues({ name: rankName, id: rankId }); // Set initial values for the input
    console.log("Edit");
  };

  const handleClickDelete = async (rankName, rankId) => {
    setActionRankLoading(true);
    await httpDelete(ENDPOINTS.ranks.rankId(rankId));
    setActionRankLoading(false);
    updateGamesList((prev) =>
      prev.map((game) => {
        if (game.ranks) {
          const updatedRanks = game.ranks.filter((rank) => rank.id !== rankId);
          return { ...game, ranks: updatedRanks };
        }
        return game;
      })
    );
  };

  const handleClickDeleteGame = async (gameId) => {
    console.log("gameId", gameId);
    setActionLoading(true);
    await httpDelete(ENDPOINTS.games.gameId(gameId));
    setActionLoading(false);
    updateGamesList((prev) => prev.filter((game) => game.id !== gameId));

    console.log("Delete game");
  };

  const handleUpdateGame = () => {
    setOpen(true);
    setActionType("updateGame");
    console.log("Update game");
  };

  const handleClose = () => {
    setOpen(false);
    setActionType("");
  };

  //Image part
  const handleImageUpload = async (data, setFile) => {
    try {
      // console.log(ENDPOINTS.games.gameImg(game.id));
      const response = await httpPostMultiPart(
        ENDPOINTS.games.gameImg(game.id),
        data
      );
      updateGamesList((prev) =>
        prev.map((game) => {
          if (game.id === response.data.id) {
            return response.data;
          }
          return game;
        })
      );
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 900, mt: 3, height: "100%", "--Card-padding": "10px" }}
      >
        <CardMedia
          sx={{ height: 300 }}
          image={
            (game.fileUrl && process.env.REACT_APP_API_URL + game.fileUrl) ||
            "/reptile.jpg"
          }
          title={game.title}
        >
          <AdminGameImageUploader onUpload={handleImageUpload} />
        </CardMedia>
        <CardContent>
          <Divider />

          <Typography sx={{ mt: 2 }} gutterBottom variant="h4" component="div">
            {game.name}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Ranks:
          </Typography>
          <Box sx={{ ml: 3 }}>
            {game.ranks && (
              <div>
                {game.ranks.map((rank, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {rank.name}
                    </Typography>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleClickEdit(rank.name, rank.id)}
                      >
                        <EditIcon />
                      </Button>

                      <LoadingButton
                        onClick={() => handleClickDelete(rank.name, rank.id)}
                        loading={actionRankLoading}
                        size="small"
                      >
                        <DeleteIcon />
                      </LoadingButton>
                    </CardActions>
                  </Box>
                ))}
                <Box sx={{}}>
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setActionType("add");
                    }}
                  >
                    <Typography variant="body2" color="blue">
                      Add rank
                    </Typography>
                  </Button>
                </Box>
              </div>
            )}
          </Box>
        </CardContent>
        <Divider />
        {/* <Divider inset="none" /> */}

        <CardActions sx={{ justifyContent: "space-between", pt: 4 }}>
          <Typography level="title-lg" sx={{ mr: "auto" }}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleUpdateGame}
            >
              Edit
            </Button>
          </Typography>
          <LoadingButton
            onClick={() => handleClickDeleteGame(game.id)}
            loading={actionLoading}
            variant="outlined"
          >
            Delete
          </LoadingButton>

          {/* Add more buttons or actions as needed */}
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        {actionType === "edit" && (
          <AdminRankForm
            title="Edit"
            inputs={[
              {
                name: "name",
                type: "text",
                label: "Nom du rang",
                value: initialRankValues.name,
                id: initialRankValues.id,
              },
            ]}
            action="edit"
            handleClose={handleClose}
            updateGamesList={updateGamesList}
          />
        )}
        {actionType === "add" && (
          <AdminRankForm
            title="Ajouter"
            inputs={[
              {
                name: "name",
                type: "text",
                label: "Nom du rang",
                gameId: game.id,
              },
            ]}
            action="add"
            handleClose={handleClose}
            updateGamesList={updateGamesList}
          />
        )}
        {actionType === "updateGame" && (
          <AdminGameUpdateForm
            game={game}
            handleClose={handleClose}
            updateGamesList={updateGamesList}
          />
        )}
      </Dialog>
    </>
  );
}
