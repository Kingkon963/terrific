"use client"
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

import useIncidents from '@/hooks/useIncidents';
import ControlPanel from '@/components/ControlPanel';
import { MapEventHandler } from './MapEventHandler';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Map = () => {
  const { incidents } = useIncidents();

  return (
    <div className='flex gap-4 w-full relative z-0'>
      <ControlPanel />
      {incidents.isSuccess && (
        <div className='flex flex-col gap-2 p-4'>
          {incidents.data.map((item) => (
              <div key={item.id} className='bg-white p-4 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold'>{item.incident_type}</h3>
                <p>{item.description}</p>
              </div>
          ))}
        </div>
      )}

      <MapContainer center={[23.7504, 90.40744]} zoom={7} style={{ height: '100dvh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEventHandler />
        {/* Add markers to the map */}
        {incidents.isSuccess && incidents.data.map((item) => (
          <GeoJSON key={item.id} data={item.location} />
        ))}
      </MapContainer>
    </div>
  );
};

const WrappedMap = () => {
  return <QueryClientProvider client={queryClient}><Map /></QueryClientProvider>;
};

      
export default WrappedMap;
