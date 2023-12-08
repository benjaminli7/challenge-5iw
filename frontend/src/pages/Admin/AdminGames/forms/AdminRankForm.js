import { DialogContent } from "@mui/material";
import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React from "react";
import ENDPOINTS from "@/services/endpoints";
import usePatch from "@/hooks/usePatch";
import useDelete from "@/hooks/useDelete";
import TextField from "@mui/material/TextField";
import { useForm, useFieldArray } from "react-hook-form";
import { httpPost, httpPatch, httpDelete, isAdmin } from "@/services/api";

function AdminRankForm({
  title,
  inputs,
  url,
  action,
  handleClose,
  updateGamesList,
}) {
  console.log("inputs", inputs);
  const { register, control, handleSubmit, reset, trigger, setError } =
    useForm();

  const onSubmit = async (data) => {
    try {
      data.id = parseInt(data.id);
      // console.log("test");
      if (action === "edit") {
        // const response = await httpPatch(ENDPOINTS.ranks.rankId(data.id), data);
        updateGamesList((prev) =>
          prev.map((game) => {
            if (game.ranks) {
              const updatedRanks = game.ranks.map((rank) => {
                if (rank.id == data.id) {
                  console.log(data.id, rank.id);
                  rank.name = data.name;
                } else {
                  console.log(
                    "Le rang n'est pas trouvé",
                    typeof rank.id,
                    typeof data.id
                  );
                }
                return rank;
              });

              return { ...game, ranks: updatedRanks };
            }

            return game;
          })
        );
      } else if (action === "delete") {
        console.log(typeof data.id);

        const response = await httpDelete(ENDPOINTS.ranks.rankId(data.id));
        updateGamesList((prev) =>
          prev.map((game) => {
            if (game.ranks) {
              const updatedRanks = game.ranks.filter(
                (rank) => rank.id != data.id
              );
              return { ...game, ranks: updatedRanks };
            }
          })
        );
      }

      handleClose();
    } catch (error) {
      console.log(error);
      // console.log(error);
      // setErrorGame(error.response.data.message);
    }
  };

  console.log("action", action);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText color={action == "delete" && "red"}>
          {action === "edit" && "Edit rank " + inputs[0].value}
          {action === "delete" &&
            "Are you sure you want to delete the " +
              inputs[0].value +
              " rank ?"}
        </DialogContentText>

        {inputs.map((input) => {
          return (
            input.type === "text" && (
              <TextField
                key={input.name}
                autoFocus
                margin="dense"
                id={input.name}
                label={input.label}
                type={input.type}
                fullWidth
                {...register(input.name, { required: true })}
              />
            )
          );
        })}
        <input type="hidden" {...register("id")} value={inputs[0].id} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Send</Button>
      </DialogActions>
    </form>
  );
}

export default AdminRankForm;
