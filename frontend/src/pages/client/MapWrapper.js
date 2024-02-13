import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const center = {
  lat: 46.227638,
  lng: 2.213749,
};

function MapWrapper() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(MapWrapper);
