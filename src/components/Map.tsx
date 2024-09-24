"use client"
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer } from 'react-leaflet';

import ControlPanel from '@/components/ControlPanel';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RangeProvider } from '@/contexts/RangeContext';
import IncidentMarker from './IncidentMarker';
import IncidentList from './IncidentList';
import { MapEventHandler } from './MapEventHandler';
import Locator from './Locator';
import { useState } from 'react';

const queryClient = new QueryClient();

const Map = () => {
  const [showIncidentList, setShowIncidentList] = useState(false);

  const toggleIncidentList = () => {
    setShowIncidentList(!showIncidentList);
  };

  return (
    <div className='flex gap-4 w-full relative z-0'>
      <MapContainer center={[23.7504, 90.40744]} zoom={7} style={{ height: '100dvh' }} className='absolute left-0 right-0 top-0 bottom-0 z-50'>
        <ControlPanel />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEventHandler />
        {/* Add markers to the map */}
        <IncidentMarker />
        <Locator />
        <IncidentList toggleIncidentList={toggleIncidentList} show={showIncidentList} />
      </MapContainer>
    </div>
  );
};

const WrappedMap = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RangeProvider>
        <Map />
      </RangeProvider>
    </QueryClientProvider>);
};

      
export default WrappedMap;
