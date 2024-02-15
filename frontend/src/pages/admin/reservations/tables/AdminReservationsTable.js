import { CircularProgress, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
//   {
//     field: "firstName",
//     headerName: "Prénom",
//     flex: 1,
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     flex: 1,
//   },
//   {
//     field: "roles",
//     headerName: "Roles",
//     flex: 1,
//   },
];

function AdminReservationsTable({ error, reservations }) {
  if (error) return <div>{error}</div>;
  console.log("reservarions",reservations)
  if (!reservations)
    return (
      <Grid container justifyContent={"center"}>
        <CircularProgress />
      </Grid>
    );
  return <DataGrid columns={columns} rows={reservations} checkboxSelection />;
}

export default AdminReservationsTable;