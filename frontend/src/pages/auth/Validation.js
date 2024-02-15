import Box from "@mui/material/Box";
import { useUsers } from "@/hooks/models/useUsers";
import CustomButton from "@/components/commons/CustomButton";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Validation() {
  const {

    handleSubmit,
    formState: { errors, isSubmitting },
    reset,

  } = useForm();
  function getParams(url) {
    const params = {};
    const urlSearchParams = new URLSearchParams(url.split("?")[1]);
    for (const [key, value] of urlSearchParams) {
      params[key] = value;
    }
    return params;
  }

  const params = getParams(window.location.search);
  const { emailValidationMutation } = useUsers(null, params["token"]);
  const onSubmit = async (data) => {
    try {
      await emailValidationMutation.mutateAsync({});
      toast.success("You're account is verify!");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Error for verify account");
    }
  };

  return (

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <CustomButton
          isSubmitting={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Verify my account
        </CustomButton>
      </Box>

    

  );
}
