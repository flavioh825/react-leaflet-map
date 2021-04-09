import React, {useContext, useState} from 'react';
import AsyncSelect from "react-select/async";
import { FaTruck } from "react-icons/fa";
import { MapContext } from '../../Contexts/Map';
import { v4 as uuid } from "uuid";

import { getLocal } from "../../services/mapBoxApi";

import "./style.css";

export default function Form() {

  const {
    location, 
    setLocation, 
    setPosition, 
    deliveries, 
    setDeliveries 
  } = useContext(MapContext);

  const [name, setName] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [address, setAddress] = useState(null);

  const loadOptions = async (inputValue, callback) => {
    const response = await getLocal(inputValue);

    if (inputValue.length < 5) return;

    let places = [];

    response.features.map((val) => {
      return places.push({
        label: val.place_name,
        value: val.place_name,
        coords: val.center,
        place: val.place_name,
      });
    });

    callback(places);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if(!address || !name) return;

    setDeliveries([
      ...deliveries,
      {
        id: uuid(),
        latitude: location.lat,
        longitude: location.lng,
        name,
        address: address?.value || "",
        addressComplement,
      },
    ]);

    setPosition(null);
    setName("");
    setAddress(null);
    setAddressComplement("");
  }

  const handleChangeSelect = (e) => {
    setPosition({ longitude: e.coords[0], latitude: e.coords[1] });
    setAddress({ label: e.place, value: e.place });
    setLocation({ lng: e.coords[0], lat: e.coords[1] });
  };

  return (
    <div className="form-content">
      <h2>
        <FaTruck /> FLV Entregas
      </h2>
      <hr />
      <form onSubmit={handleSubmit} className="landing-page-form">
        <div className="input-box">
          <label>Nome</label>
          <input
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)} 
            value={name} />
        </div>
        <div className="input-box">
          <label>Endereço</label>
          <AsyncSelect
            cacheOptions
            placeholder="Digite o endereço..."
            classNamePrefix="filter"
            onChange={handleChangeSelect}
            loadOptions={loadOptions}
            value={address} />
        </div>
        <div className="input-box">
          <label>Complemento</label>
          <input
            placeholder="Ex.: casa, número, apartamento... "
            onChange={(e) => setAddressComplement(e.target.value)}
            value={addressComplement} />
        </div>
        <button type="submit">
          Inserir
        </button>
      </form>
    </div>
  )
}
