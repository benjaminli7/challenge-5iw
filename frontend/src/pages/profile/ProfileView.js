import { Stack, Typography } from "@mui/material";
import { useAuthUser } from "react-auth-kit";

function ProfileView() {
  const auth = useAuthUser();
  const { email, firstName, lastName, phone } = auth().user;
  return (
    <Stack>
        <Typography variant="h4">Profile</Typography>
        <Typography variant="h6">Email: {email}</Typography>
        <Typography variant="h6">First Name: {firstName}</Typography>
        <Typography variant="h6">Last Name: {lastName}</Typography>
        <Typography variant="h6">Phone: {phone ?? "Non défini" }</Typography>
    </Stack>
  );
}

export default ProfileView;
