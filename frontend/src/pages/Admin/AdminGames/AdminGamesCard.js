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
import { useState } from "react";
import { useQueryClient } from "react-query";
import { Dialog } from "@mui/material";
import AdminRankForm from "./forms/AdminRankForm";
import AdminGameUpdateForm from "./forms/AdminGameUpdateForm";
import ENDPOINTS from "@/services/endpoints";
import LoadingButton from "@mui/lab/LoadingButton";
import AdminGameImageUploader from "./forms/AdminGameImageUploader";
import { Divider } from "@mui/material";

// const useStyles = makeStyles(() => ({
//   card: {
//     width: '100%',
//     borderRadius: 16,
//     boxShadow: '0 8px 16px 0 #BDC9D7',
//     overflow: 'hidden',
//   },
//   header: {
//     fontFamily: 'Barlow, san-serif',
//     backgroundColor: '#fff',
//   },
//   headline: {
//     color: '#122740',
//     fontSize: '1.25rem',
//     fontWeight: 600,
//   },
//   link: {
//     color: '#2281bb',
//     padding: '0 0.25rem',
//     fontSize: '0.875rem',
//   },
//   actions: {
//     color: '#BDC9D7'
//   },
//   divider: {
//     backgroundColor: '#d9e2ee',
//     margin: '0 20px',
//   }
// }));

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
    // console.log("Edit");
  };

  const handleClickDelete = async (rankName, rankId) => {
    // setActionRankLoading(true);
    await httpDelete(ENDPOINTS.ranks.rankId(rankId));
    // setActionRankLoading(false);
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
    // console.log("gameId", gameId);
    // setActionLoadingStates((prev) => ({ ...prev, [gameId]: true }));
    await httpDelete(ENDPOINTS.games.gameId(gameId));
    updateGamesList((prev) => prev.filter((game) => game.id !== gameId));

    // console.log("Delete game");
  };

  const handleUpdateGame = () => {
    setOpen(true);
    setActionType("updateGame");
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
  // const [buttonLoadingStates, setButtonLoadingState] = React.useState({
  //   [buttonId]: false,
  // });

  // const handleClickAction = async (event) => {
  //   const action = event.currentTarget.value;
  //   setActionLoading(true);

  //   setActionLoading(false);

  return (
    <>
      <Card
        variant="solid"
        color="warning"
        sx={{
          width: "100%",
          mt: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: "0 8px 16px 0 #BDC9D7",
          overflow: "hidden",
          transition: "0.4s",
          "&:hover": {
            transform: "translateY(-5px)",
            position: "relative", // Add this line to reset position
            boxShadow: "0 17px 24px 0 #BDC9D7",

            "& $shadow": {
              bottom: "-1.5rem",
            },
            "& $shadow2": {
              bottom: "-2.5rem",
            },
          },
          "&:before": {
            content: '""',
            position: "absolute",
            display: "block",
            bottom: -1,
          },
        }}
      >
        <CardMedia
          sx={{ height: 300 }}
          image={
            (game.fileUrl && process.env.REACT_APP_API_URL + game.fileUrl) ||
            "/reptile.jpg"
          }
          title={game.title}
        >
          <AdminGameImageUploader
            sx={{ backgroundColor: "white" }}
            onUpload={handleImageUpload}
          />
        </CardMedia>
        {/* <Divider component="div" role="presentation" /> */}

        <CardContent sx={{ backgroundColor: "white" }}>
          <Typography
            sx={{ textAlign: "center" }}
            gutterBottom
            variant="h3"
            component="div"
          >
            {game.name}
          </Typography>

          <Divider sx={{ m: 3 }} />
          <Typography
            sx={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
            variant="body2"
            color="text.secondary"
          >
            <Typography sx={{ mt: 2 }} variant="h5" color="text.secondary">
              Couleur de la carte :
              <input
                type="color"
                value={game.color}
                disabled
                style={{
                  width: 100,
                  height: 30,
                  marginLeft: 10,
                  verticalAlign: "middle",
                  borderRadius: "40%",
                }}
              />
            </Typography>
          </Typography>

          <Divider sx={{ m: 3 }} />

          <Typography sx={{ mt: 2 }} variant="h5" color="text.secondary">
            Rangs:
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
                        sx={{ color: "red" }}
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
          <Divider sx={{ m: 4 }} />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
            alignItems: "flex-end",
            p: 2,
            flexGrow: 1,
            backgroundColor: "white",
          }}
        >
          <Button
            size="large"
            startIcon={<EditIcon />}
            onClick={handleUpdateGame}
            sx={{
              mr: "auto",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          >
            Modifier
          </Button>
          <Button
            onClick={() => handleClickDeleteGame(game.id)}
            startIcon={<DeleteIcon />}
            loading={actionLoading}
            variant=""
            sx={{ position: "absolute", right: 0, bottom: 0, color: "red" }}
          >
            Supprimer
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        {actionType === "edit" && (
          <AdminRankForm
            title="Modifier"
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
