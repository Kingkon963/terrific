"use client";
import useIncidents from "@/hooks/useIncidents";
import { useMapEvents } from "react-leaflet";

export const MapEventHandler = () => {
  const { incidents } = useIncidents();

  const map = useMapEvents({
    click: () => {
      console.log('MapEventHandler -> click');
      incidents.refetch();
    },
    locationfound: (location) => {
      console.log('MapEventHandler -> location', location);
      map.flyTo(location.latlng, map.getZoom());
    },
    popupopen: (e) => {
      console.log('MapEventHandler -> popupopen', e);
    }
  });

  return null;
};
