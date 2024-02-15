import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import ClientBoosterItemList from "./ClientBoosterItemList";

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const center = {
  lat: 46.227638,
  lng: 2.213749,
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MapWrapper({ players }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleClickMarker = (player) => {
    const playersByAddress = players.filter(
      (p) => p.address === player.address
    );
    setSelectedPlayers(playersByAddress);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRedirect = (idPlayer) => {
    navigate(`/client/player/${idPlayer}`);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  return (
    <div>
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
          {players.map((player, index) =>
            player.lat ? (
              <MarkerF
                key={index}
                position={{ lat: player.lat, lng: player.lng }}
                onClick={() => handleClickMarker(player)}
              />
            ) : null
          )}
        </GoogleMap>
      ) : (
        <></>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Players at {selectedPlayers[0]?.address}
          </Typography>
          {selectedPlayers.map((player, index) => (
            <ClientBoosterItemList key={index} player={player} />
          ))}
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(MapWrapper);
