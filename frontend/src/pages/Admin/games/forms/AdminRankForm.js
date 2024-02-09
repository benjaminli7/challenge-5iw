import CustomButton from "@/components/commons/CustomButton";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

function AdminRankForm({
  deleteRankMutation,
  handleDeleteRank,
  selectedRank,
  onSubmit,
  actionType,
}) {
  const defaultValues = {
    name: selectedRank?.name || "",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {actionType === "create" ? "Create a new rank" : "Edit rank"}
      </DialogTitle>
      <DialogContent>
        <TextField
          key={"name"}
          autoFocus
          margin="dense"
          id={"name"}
          label={"Name"}
          fullWidth
          {...register("name", { required: true })}
        />
      </DialogContent>
      <DialogContent>
        <input
          type="file"
          accept="image/*"
          {...register("file", { required: false })}
        />
      </DialogContent>
      <DialogActions>
        <CustomButton
          type="submit"
          variant="contained"
          isSubmitting={isSubmitting}
        >
          Submit
        </CustomButton>
        {actionType === "update" && (
          <CustomButton
            type="button"
            isSubmitting={deleteRankMutation.isLoading}
            onClick={handleDeleteRank}
            variant="contained"
            color="error"
          >
            Delete
          </CustomButton>
        )}
      </DialogActions>
    </form>
  );
}

export default AdminRankForm;
