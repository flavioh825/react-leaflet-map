import React from 'react'
import { Popup } from "react-leaflet";

export default function MarkerPopup(props) {
  return (
    <Popup {...props} className="map-popup">
      <div>
        <h3>{props.delivery.name}</h3>
        <p>
          {props.delivery.address} - {props.delivery.complement}
        </p>
      </div>
    </Popup>
  )
}
