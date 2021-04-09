import React, { useContext } from 'react';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";

import PackageSVG from "../../assets/img/package.svg";
import PinSVG from "../../assets/img/pin.svg";

import { MapContext } from '../../Contexts/Map';
import MarkerPopup from '../MarkerPopup';

import "./style.css";

const mapPackage = Leaflet.icon({
  iconUrl: PackageSVG,
  iconSize: [60, 95],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const mapPin = Leaflet.icon({
  iconUrl: PinSVG,
  iconSize: [60, 95],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const MAP_BOX_STYLE = `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`

export default function Map() {

  const {location, deliveries, position} = useContext(MapContext);

  return (
    <div className="map">
      <MapContainer
        center={location}
        zoom={13}
        className="render-map"
      >
        <TileLayer url={MAP_BOX_STYLE} />
        {position && (
          <Marker
            icon={mapPin}
            position={[
              position.latitude, 
              position.longitude
            ]}
          ></Marker>
        )}
        {deliveries.map((delivery) => (
          <Marker
            key={delivery.id}
            icon={mapPackage}
            position={[
              delivery.latitude, 
              delivery.longitude
            ]}
          >
            <MarkerPopup
              closeButton={false}
              minWidth={280}
              maxWidth={280}
              delivery={delivery}
              />
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
