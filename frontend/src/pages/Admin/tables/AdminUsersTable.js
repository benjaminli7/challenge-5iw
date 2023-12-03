import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from '@mui/material';

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
  // {
  //   field: "createdAt",
  //   headerName: "Created At",
  //   width: 200,
  // },
  // {
  //   field: "updatedAt",
  //   headerName: "Updated At",
  //   width: 200,
  // },
];

function AdminUsersTable({ error, users }) {
  if(error) return <div>Erreur de chargement des utilisateurs</div>;
  if(!users) return <CircularProgress />
  return <DataGrid columns={columns} rows={users} checkboxSelection />;
}

export default AdminUsersTable