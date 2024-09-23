"use client";
import { useMapEvents } from "react-leaflet";

export const MapEventHandler = () => {

  const map = useMapEvents({
    click: () => {
      console.log('MapEventHandler -> click');
    },
    locationfound: (location) => {
      console.log('MapEventHandler -> location', location);
      map.flyTo(location.latlng, map.getZoom());
    },
    popupopen: (e) => {
      console.log('MapEventHandler -> popupopen', e);
    },
  });

  return null;
};
