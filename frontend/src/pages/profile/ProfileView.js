import Loader from "@/components/commons/Loader";
import useFetch from "@/hooks/useFetch";
import UpdatePasswordForm from "@/pages/profile/forms/UpdatePasswordForm";
import UpdateProfileForm from "@/pages/profile/forms/UpdateProfileForm";
import ENDPOINTS from "@/services/endpoints";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useAuthUser } from "react-auth-kit";

function ProfileView() {
  const auth = useAuthUser();
  const id = auth().user.id;
  const { data: user, isLoading } = useFetch(
    "user",
    ENDPOINTS.users.userId(id)
  );
  if (isLoading) return <Loader />

  return (
    <Paper elevation={2} sx={{ p: { xs: 3, md: 12 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <UpdateProfileForm user={user} />
        </Grid>
        <Grid item xs={12} md={2} container justifyContent={"center"}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} md={5}>
          <UpdatePasswordForm user={user} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProfileView;
