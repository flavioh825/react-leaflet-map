import React, {useEffect, useState} from "react";

import "leaflet/dist/leaflet.css";
import './App.css';

import { MapContext } from "./Contexts/Map";
import Form from "./components/Form";
import Map from "./components/Map";

function App() {
  const startsPosition = { lat: -22.76160, lng: -43.416031 };

  const [deliveries, setDeliveries] = useState([]);
  const [position, setPosition] = useState(null);
  const [location, setLocation] = useState(startsPosition);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  let value = {
    location,
    setLocation,
    position,
    setPosition,
    deliveries,
    setDeliveries,
  };

  if(!location) return "Loading...";

  return (
    <MapContext.Provider value={value}>
      <Form />
      <Map />
    </MapContext.Provider>
  );
}

export default App;
