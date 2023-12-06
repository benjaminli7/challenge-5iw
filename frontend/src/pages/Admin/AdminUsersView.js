import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Typography } from "@mui/material";
import AdminUsersTable from "./tables/AdminUsersTable";

function AdminUsersView() {
  const { data: users, error } = useFetch("users", ENDPOINTS.users.root);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Liste des utilisateurs
      </Typography>
      <AdminUsersTable error={error} users={users} />
    </>
  );
}

export default AdminUsersView;
