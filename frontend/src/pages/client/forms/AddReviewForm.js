import React from "react";
import CustomButton from "@/components/commons/CustomButton";

import { useReviews } from "@/hooks/models/useReviews";
import { Box, Typography, TextareaAutosize, Rating } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormControl, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomRating from "@/components/commons/CustomRating";

function AddReviewForm({ selectedBooking, handleDialogClose }) {
  const { addReviewMutation } = useReviews();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      data.schedule = `/api/schedules/${selectedBooking.schedule.id}`;
      data.rating = parseInt(data.rating);
      await addReviewMutation.mutateAsync(data);
      toast.success("Thank you for your review!");
      handleDialogClose(); // Move this line here
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Box sx={style}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add a review
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomRating
          id="rating"
          name="rating"
          control={control}
          defaultValue={0}
        />
        <TextareaAutosize
          {...register("comment")}
          placeholder="Write your review here"
          style={{ width: "100%", resize: "none", marginTop: "10px" }}
        />
        <CustomButton
          type="submit"
          isSubmitting={isSubmitting}
          variant="contained"
          sx={{ marginTop: "10px" }}
        >
          Submit
        </CustomButton>
      </form>
    </Box>
  );
}

export default AddReviewForm;
