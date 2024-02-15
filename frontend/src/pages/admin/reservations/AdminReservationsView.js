import { Typography } from "@mui/material";
import AdminReservationsTable from "@/pages/admin/reservations/tables/AdminReservationsTable";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
function AdminReservationsView() {
  const {
    data: reservations,
    isError,
    error,
    isLoading,
  } = useFetch("reservations", ENDPOINTS.bookings.root);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Liste des reservations
      </Typography>
    <AdminReservationsTable error={error} reservations={reservations} />
    </>
  );
}

export default AdminReservationsView;
