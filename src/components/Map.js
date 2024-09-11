"use client"

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useIncidents from '@/hooks/useIncidents';
import ControlPanel from '@/components/ControlPanel';

const Map = ({ }) => {
  const { fetchItems } = useIncidents();

  useEffect(() => {
    // check if the map container is already initialized
    if (document.getElementById('map')._leaflet_id) {
      return;
    }

    // Initialize the map
    const map = L.map('map').setView([23.7104, 90.40744], 13);


    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Fetch items when the button is clicked
    const fetchItemsBtn = document.getElementById('fetchItemsBtn');
    fetchItemsBtn.addEventListener('click', () => {
      const bounds = map.getBounds();
      const lat_min = bounds.getSouthWest().lat;
      const lon_min = bounds.getSouthWest().lng;
      const lat_max = bounds.getNorthEast().lat;
      const lon_max = bounds.getNorthEast().lng;

      // Call the fetchItems function passed as a prop
      fetchItems(lat_min, lon_min, lat_max, lon_max);
    });
  }, [fetchItems]);

  return (
    <div className='flex gap-4 w-full'>
      <ControlPanel />
      <div id="map" style={{ height: '100dvh', width: '100%' }}></div>
    </div>
  );
};

export default Map;
