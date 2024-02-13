import useFetch from "@/hooks/useFetch";
import ClientBoosterDetailCalendar from "@/pages/client/ClientBoosterDetailCalendar";
import ClientBoosterDetailInfos from "@/pages/client/ClientBoosterDetailInfos";
import ENDPOINTS from "@/services/endpoints";
import { Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";

function ClientBoosterDetail() {
  const { id } = useParams();
  const {
    data: player,
    isLoading: isLoadingPlayer,
    isError,
  } = useFetch("player", ENDPOINTS.users.player(id));
  if (isLoadingPlayer) return <div>Loading...</div>;
  if (isError) return <div>This player doesn't exist!</div>;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <ClientBoosterDetailInfos player={player} />
        <Paper
          elevation={2}
          sx={{
            p: 3,
            width: "100%",
            height: { xs: "100%", sm: "80vh" },
            overflowY: { sm: "scroll" },
          }}
        >
          <ClientBoosterDetailCalendar player={player} />
        </Paper>
      </Box>
    </div>
  );
}

export default ClientBoosterDetail;
