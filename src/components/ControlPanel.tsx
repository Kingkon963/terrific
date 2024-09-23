import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useMap } from "react-leaflet";
import useRange from "@/hooks/useRange";


const ControlPanel = () => {
  const { updateRange } = useRange();
  const map = useMap();

  const handleSearch = useCallback(() => {
    const bounds = map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    updateRange({
      maxLong: northEast.lng,
      minLong: southWest.lng,
      maxLat: northEast.lat,
      minLat: southWest.lat,
    });
  }, [map, updateRange]);
  
  return (
    <div className="absolute top-0 left-0 right-0 z-[999] bg-background flex items-center flex-col gap-4 p-4">
      <Button onClick={() => handleSearch()} className="max-w-xs">Search this area</Button>
    </div>
  );
};

export default ControlPanel;
