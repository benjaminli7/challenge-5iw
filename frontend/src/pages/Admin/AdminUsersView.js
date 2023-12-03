import { Typography } from "@mui/material";
import AdminUsersTable from "./tables/AdminUsersTable";
import ENDPOINTS from "@/services/endpoints";
import useFetch from "@/hooks/useFetch";



function AdminUsersView() {
  // const {error, loading, data: users} = useFetch(ENDPOINTS.users.root);
  // console.log(users);
  // const { data: users, error } = useAdminUsers();
  const {data: users, error} = useFetch("users", ENDPOINTS.users.root)

  return (
    <>
      <Typography variant="h4" gutterBottom>Liste des utilisateurs</Typography>
      <AdminUsersTable error={error} users={users}/>
    </>
  );
}

export default AdminUsersView;
