"use client"
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect } from 'react';
import { useMap, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import useIncidents from '@/hooks/useIncidents';
import ControlPanel from '@/components/ControlPanel';

const Map = () => {
  const { incidents, fetchIncidents } = useIncidents();

  console.log('Map -> incidents', incidents);

  return (
    <div className='flex gap-4 w-full'>
      <ControlPanel fetchIncidents={fetchIncidents} />

      <MapContainer center={[23.7504, 90.40744]} zoom={13} style={{ height: '100dvh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <MapEventHandler /> */}
        {/* Add markers to the map */}
        {incidents.map((item) => (
          <Marker key={item.id} position={[item.lat, item.lon]}>
            <Popup>
              <p>{item.description}</p>
              <a href="#">View details</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
