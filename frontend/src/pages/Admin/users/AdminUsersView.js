import { Typography } from "@mui/material";
import AdminUsersTable from "@/pages/admin/users/tables/AdminUsersTable";
import { useUsers } from "@/hooks/models/useUsers";

function AdminUsersView() {
  const { users, error } = useUsers();

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