import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { useParams } from "react-router-dom";

function ClientBoosterDetail() {
  const { id } = useParams();
  const {
    data: player,
    isLoading: isLoadingPlayer,
    isError,
  } = useFetch("player", ENDPOINTS.users.player(id));
  if (isLoadingPlayer) return <div>Loading...</div>;
  if(isError) return <div>This player doesn't exist!</div>
  console.log(player)

  return <div>ClientBoosterDetail</div>;
}

export default ClientBoosterDetail;
