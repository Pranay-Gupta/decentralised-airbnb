import React from "react";
import GoogleMapReact from "google-map-react";

import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
const Map = ({
  places,
  coordinates,
  setCoordinates,
  setBound,
  setChildClicked,
}) => {
  return (
    // <div className="map">
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={15}
      margin={[10, 10, 10, 10]}
      options={""}
      onChange={(e) => {
        setBound({
          ne_lat: e.bounds.ne.lat,
          ne_lng: e.bounds.ne.lng,
          sw_lat: e.bounds.sw.lat,
          sw_lng: e.bounds.sw.lng,
        });
        setCoordinates({ lat: e.center.lat, lng: e.center.lng });
      }}
      onChildClick={(child) => setChildClicked(child)}
    >
      {places?.map((place, i) => (
        <Box lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
          <Tooltip title={place.name} placement="top">
            <LocationOnTwoToneIcon
              sx={{
                color: "#EB4E5F",
                transition: "transform 0.4s",
                "&:hover": {
                  transform: "scale(1.3)",
                  cursor: "pointer",
                },
              }}
            />
          </Tooltip>
        </Box>
      ))}
    </GoogleMapReact>
  );
};

export default Map;
