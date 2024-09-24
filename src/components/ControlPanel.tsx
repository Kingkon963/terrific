import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useMap } from "react-leaflet";
import useRange from "@/hooks/useRange";
import useIncidents from "@/hooks/useIncidents";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ControlPanel = () => {
  const { updateRange, range } = useRange();
  const {incidentsByRange} = useIncidents({fromRange: range});
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
      <Button onClick={() => handleSearch()} className="max-w-xs flex gap-2">
        <span>Search this area</span>
        {incidentsByRange.isLoading && <span className="animate-spin">
          <AiOutlineLoading3Quarters />
          </span>}
      </Button>
    </div>
  );
};

export default ControlPanel;
