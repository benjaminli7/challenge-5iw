import Loader from "@/components/commons/Loader";
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
  if (!users) return <Loader />;
  return (
    <DataGrid
      columns={columns}
      rows={users}
      initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
      }}
    />
  );
}

export default AdminUsersTable;
