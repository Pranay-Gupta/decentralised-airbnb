import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rentals from "./pages/Rentals/Rentals";

import { getData } from "./api";
import Details from "./pages/Details/Details";
import { searchFilterContext } from "./Context";
import Trip from "./pages/Trip";

const App = () => {
  const [bound, setBound] = useState({});
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [childClicked, setChildClicked] = useState(null);

  const { destination, setDestination } = useContext(searchFilterContext);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    setDestination(autocomplete.getPlace().formatted_address);
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  useEffect(() => {
    setIsLoading(true);
    getData(bound, "hotels").then((data) => {
      setPlaces(data?.filter((place) => place.name));
      setIsLoading(false);
    });
    console.log(places);
  }, [bound]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            destination={destination}
          />
        }
      />
      <Route
        path="/rentals"
        element={
          <Rentals
            isLoading={isLoading}
            autocomplete={autocomplete}
            bound={bound}
            setAutocomplete={setAutocomplete}
            onPlaceChanged={onPlaceChanged}
            places={places}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBound={setBound}
            childClicked={childClicked}
            setChildClicked={setChildClicked}
          />
        }
      />
      <Route path="/details" element={<Details />} />
      <Route path="/trip" element={<Trip />} />
    </Routes>
  );
};

export default App;
