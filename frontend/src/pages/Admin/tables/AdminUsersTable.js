import { CircularProgress, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
  },
  {
    field: "lastName",
    headerName: "Nom",
    flex: 1,
  },
  {
    field: "firstName",
    headerName: "Prénom",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "roles",
    headerName: "Roles",
    flex: 1,
  },
];

function AdminUsersTable({ error, users }) {
  if (error) return <div>{error}</div>;
  if (!users)
    return (
      <Grid container justifyContent={"center"}>
        <CircularProgress />
      </Grid>
    );
  return <DataGrid columns={columns} rows={users} checkboxSelection />;
}

export default AdminUsersTable;
