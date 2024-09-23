import useIncidents from "@/hooks/useIncidents";
import useRange from "@/hooks/useRange";
import { useEffect } from "react";
import { GeoJSON } from 'react-leaflet';


function IncidentMarker() {
  const { range } = useRange();
  const { incidentsByRange } = useIncidents({ fromRange: range });

  useEffect(() => {
    if (range) {
      incidentsByRange.refetch();
    }
  }, [incidentsByRange, range]);

  return (
    <>
      {incidentsByRange.isSuccess && incidentsByRange.data.map((item) => (
        <GeoJSON key={item.id + Math.random()} data={item.location} />
      ))}
    </>
  )
}

export default IncidentMarker;