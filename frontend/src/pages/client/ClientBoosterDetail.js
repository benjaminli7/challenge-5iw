import useFetch from "@/hooks/useFetch";
import ClientBoosterDetailCalendar from "@/pages/client/ClientBoosterDetailCalendar";
import ClientBoosterDetailInfos from "@/pages/client/ClientBoosterDetailInfos";
import ENDPOINTS from "@/services/endpoints";
import { Box, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ClientBoosterDetailReviews from "@/pages/client/ClientBoosterDetailReviews";

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
        <Stack direction="column" spacing={2}>
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
          <Paper
            elevation={2}
            sx={{
              p: 3,
              width: "100%",
            }}
          >
            <Box>
              <ClientBoosterDetailReviews player={player} />
            </Box>
          </Paper>
        </Stack>
      </Box>
    </div>
  );
}

export default ClientBoosterDetail;
