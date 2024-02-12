import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function ClientBoostersView() {
  const [map, setMap] = useState(null);
  const { data: players, isLoading } = useFetch(
    "players",
    ENDPOINTS.users.players
  );
  if (isLoading) return <div>Loading...</div>;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Liste des filtres
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          {players.map((player, index) => (
            <Stack direction="row" spacing={3} alignItems="center" key={index}>
              <Avatar />
              <Stack>
                <Typography sx={{fontWeight: 'bold'}}>{player.team.name}</Typography>
                <Typography>
                  {player.firstName} '{player.username}' {player.lastName}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={3}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ClientBoostersView;
