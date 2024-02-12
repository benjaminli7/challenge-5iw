import { Typography } from "@mui/material";
import AdminUsersTable from "@/pages/admin/users/tables/AdminUsersTable";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
function AdminUsersView() {
  const {
    data: users,
    isError,
    error,
    isLoading,
  } = useFetch("users", ENDPOINTS.users.root);
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