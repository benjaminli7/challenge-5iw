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
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { Dialog } from "@mui/material";
import AdminRankForm from "./forms/AdminRankForm";

export default function AdminGameCard({ game, updateGamesList }) {
  const [actionType, setActionType] = useState("");
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
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

  const handleClickDelete = (rankName, rankId) => {
    setOpen(true);
    setActionType("delete");
    setInitialRankValues({ name: rankName, id: rankId }); // Set initial values for the input
    console.log("Delete");
  };

  const handleClose = () => {
    setOpen(false);
    setActionType("");
  };

  // title ,
  // url,

  return (
    <>
      <Card sx={{ maxWidth: 345, my: 5 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/reptile.jpg"
          title={game.title}
        />
        <CardContent>
          <Typography
            sx={{ mx: "auto" }}
            gutterBottom
            variant="h4"
            component="div"
          >
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
                      <Button
                        size="small"
                        onClick={() => handleClickDelete(rank.name, rank.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </CardActions>
                  </Box>
                ))}
              </div>
            )}
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="outlined" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
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
        {actionType === "delete" && (
          <AdminRankForm
            title="Suprrimer"
            inputs={[
              {
                value: initialRankValues.name,
                id: initialRankValues.id,
              },
            ]}
            action="delete"
            handleClose={handleClose}
            updateGamesList={updateGamesList}
          />
        )}
        {actionType === "add" && (
          <AdminRankForm
            title="Ajouter"
            inputs={[{ name: "name", type: "text" }]}
            action="add"
            handleClose={handleClose}
            updateGamesList={updateGamesList}
          />
        )}
      </Dialog>
    </>
  );
}
